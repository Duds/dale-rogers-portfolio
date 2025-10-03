#!/usr/bin/env python3
"""
Solo Developer Guard Rails for Cursor
Tailored for Dale Rogers Portfolio Project
"""

import json
import os
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Tuple

class SoloGuard:
    def __init__(self):
        self.project_root = Path.cwd()
        self.config_path = self.project_root / ".cursor" / "solo-guard.config.json"
        self.config = self.load_config()
        self.current_branch = None
        self.feature_branch = None
        self.prompt_slug = None
        
    def load_config(self) -> Dict:
        """Load configuration with sensible defaults"""
        default_config = {
            "maturity": "normal",
            "write_whitelist": ["^src/.*", "^docs/.*", "^tests/.*"],
            "protected_paths": ["^\\.env.*", "^\\.github/.*", ".*lock\\.(json|ya?ml)$"],
            "delete_feature_branch_after_merge": True,
            "budgets": {
                "bootstrap": {"max_files": 200, "max_lines": 20000},
                "normal": {"max_files": 40, "max_lines": 4000},
                "strict": {"max_files": 12, "max_lines": 600}
            },
            "branch_naming": {
                "types": ["feat", "fix", "refactor", "docs", "test", "chore", "style", "perf"],
                "scopes": ["ui", "layout", "content", "theme", "docs", "scripts", "tests"],
                "date_format": "DDMMYYYY"
            }
        }
        
        if self.config_path.exists():
            try:
                with open(self.config_path, 'r') as f:
                    user_config = json.load(f)
                    default_config.update(user_config)
            except (json.JSONDecodeError, IOError) as e:
                print(f"Warning: Could not load config: {e}")
                
        return default_config
    
    def get_current_branch(self) -> str:
        """Get current git branch"""
        try:
            result = subprocess.run(['git', 'branch', '--show-current'], 
                                  capture_output=True, text=True, check=True)
            return result.stdout.strip()
        except subprocess.CalledProcessError:
            return "unknown"
    
    def run_git_command(self, args: List[str], capture_output: bool = True) -> Tuple[bool, str]:
        """Run git command safely"""
        try:
            result = subprocess.run(['git'] + args, 
                                  capture_output=capture_output, text=True, check=True)
            return True, result.stdout if capture_output else ""
        except subprocess.CalledProcessError as e:
            return False, e.stderr if capture_output else ""
    
    def create_feature_branch(self, prompt: str) -> bool:
        """Create semantic feature branch based on prompt"""
        branch_type, scope, slug = self.parse_prompt(prompt)
        today = datetime.now().strftime("%d%m%Y")  # DDMMYYYY format
        branch_name = f"{branch_type}/{scope}/{slug}__{today}"
        
        # Ensure we're on develop
        success, _ = self.run_git_command(['checkout', 'develop'])
        if not success:
            print(f"Error: Could not checkout develop branch")
            return False
            
        # Create and checkout feature branch
        success, _ = self.run_git_command(['checkout', '-b', branch_name])
        if not success:
            print(f"Error: Could not create feature branch {branch_name}")
            return False
            
        self.feature_branch = branch_name
        print(f"Created feature branch: {branch_name}")
        return True
    
    def parse_prompt(self, prompt: str) -> Tuple[str, str, str]:
        """Parse prompt to determine branch type, scope, and slug"""
        prompt_lower = prompt.lower()
        
        # Determine type
        branch_type = "feat"  # default
        for t in self.config["branch_naming"]["types"]:
            if t in prompt_lower:
                branch_type = t
                break
        
        # Determine scope
        scope = "ui"  # default for portfolio
        if "theme" in prompt_lower or "color" in prompt_lower or "style" in prompt_lower:
            scope = "theme"
        elif "component" in prompt_lower or "button" in prompt_lower or "card" in prompt_lower:
            scope = "ui"
        elif "layout" in prompt_lower or "navigation" in prompt_lower or "header" in prompt_lower:
            scope = "layout"
        elif "content" in prompt_lower or "article" in prompt_lower or "case-study" in prompt_lower:
            scope = "content"
        elif "script" in prompt_lower or "automation" in prompt_lower:
            scope = "scripts"
        elif "test" in prompt_lower or "spec" in prompt_lower:
            scope = "tests"
        elif "doc" in prompt_lower or "readme" in prompt_lower:
            scope = "docs"
        
        # Create slug from prompt (first 20 chars, alphanumeric + hyphens)
        slug = re.sub(r'[^a-zA-Z0-9-]', '-', prompt[:20].strip())
        slug = re.sub(r'-+', '-', slug).strip('-')
        
        return branch_type, scope, slug
    
    def is_path_allowed(self, file_path: str, operation: str) -> bool:
        """Check if file path is allowed for operation"""
        if operation == "write":
            patterns = self.config["write_whitelist"]
        else:  # read
            patterns = self.config["protected_paths"]
            
        for pattern in patterns:
            if re.match(pattern, file_path):
                if operation == "write":
                    return True
                else:  # read protection
                    return False
        return operation == "read"
    
    def redact_sensitive_content(self, content: str) -> str:
        """Redact sensitive information from file content"""
        # Redact common patterns
        patterns = [
            (r'API_KEY["\']?\s*[:=]\s*["\'][^"\']+["\']', 'API_KEY="[REDACTED]"'),
            (r'SECRET["\']?\s*[:=]\s*["\'][^"\']+["\']', 'SECRET="[REDACTED]"'),
            (r'TOKEN["\']?\s*[:=]\s*["\'][^"\']+["\']', 'TOKEN="[REDACTED]"'),
            (r'PASSWORD["\']?\s*[:=]\s*["\'][^"\']+["\']', 'PASSWORD="[REDACTED]"'),
            (r'gho_[A-Za-z0-9_]{36}', 'gho_[REDACTED]'),
            (r'sk_[A-Za-z0-9_]{48}', 'sk_[REDACTED]'),
        ]
        
        redacted = content
        for pattern, replacement in patterns:
            redacted = re.sub(pattern, replacement, redacted)
            
        return redacted
    
    def is_shell_command_allowed(self, command: str) -> bool:
        """Check if shell command is allowed"""
        dangerous_commands = [
            'git push', 'git reset --hard', 'git clean -fd',
            'rm -rf', 'rm -r', 'rmdir', 'del /s', 'rd /s',
            'format', 'fdisk', 'mkfs', 'dd if=',
            'sudo', 'su ', 'chmod 777', 'chown'
        ]
        
        current_branch = self.get_current_branch()
        if current_branch in ['main', 'develop']:
            for dangerous in dangerous_commands:
                if dangerous in command.lower():
                    return False
                    
        return True
    
    def calculate_change_size(self) -> Tuple[int, int]:
        """Calculate current change size (files and lines)"""
        try:
            # Get staged and unstaged changes
            result = subprocess.run(['git', 'diff', '--cached', '--stat'], 
                                  capture_output=True, text=True)
            staged_files = len(result.stdout.split('\n')) - 1 if result.stdout.strip() else 0
            
            result = subprocess.run(['git', 'diff', '--stat'], 
                                  capture_output=True, text=True)
            unstaged_files = len(result.stdout.split('\n')) - 1 if result.stdout.strip() else 0
            
            # Count lines (rough estimate)
            result = subprocess.run(['git', 'diff', '--cached', '--numstat'], 
                                  capture_output=True, text=True)
            staged_lines = sum(int(line.split('\t')[0]) + int(line.split('\t')[1]) 
                             for line in result.stdout.strip().split('\n') 
                             if line and '\t' in line)
            
            result = subprocess.run(['git', 'diff', '--numstat'], 
                                  capture_output=True, text=True)
            unstaged_lines = sum(int(line.split('\t')[0]) + int(line.split('\t')[1]) 
                               for line in result.stdout.strip().split('\n') 
                               if line and '\t' in line)
            
            total_files = staged_files + unstaged_files
            total_lines = staged_lines + unstaged_lines
            
            return total_files, total_lines
            
        except Exception:
            return 0, 0
    
    def commit_and_merge(self) -> bool:
        """Commit changes and merge to develop"""
        if not self.feature_branch:
            print("No feature branch to merge")
            return False
            
        # Stage all changes
        success, _ = self.run_git_command(['add', '.'])
        if not success:
            print("Error staging changes")
            return False
            
        # Create commit message
        commit_msg = f"{self.feature_branch.split('/')[0]}: {self.prompt_slug or 'automated changes'}"
        
        # Commit
        success, _ = self.run_git_command(['commit', '-m', commit_msg])
        if not success:
            print("Error committing changes")
            return False
            
        # Switch to develop and merge
        success, _ = self.run_git_command(['checkout', 'develop'])
        if not success:
            print("Error switching to develop")
            return False
            
        success, _ = self.run_git_command(['merge', self.feature_branch, '--no-ff'])
        if not success:
            print(f"Error merging {self.feature_branch} to develop")
            return False
            
        # Delete feature branch if configured
        if self.config.get("delete_feature_branch_after_merge", True):
            self.run_git_command(['branch', '-d', self.feature_branch])
            
        print(f"Successfully merged {self.feature_branch} to develop")
        return True
    
    def handle_before_submit_prompt(self, prompt: str) -> None:
        """Handle beforeSubmitPrompt hook"""
        self.prompt_slug = self.parse_prompt(prompt)[2]
        self.create_feature_branch(prompt)
    
    def handle_before_read_file(self, file_path: str) -> str:
        """Handle beforeReadFile hook"""
        if not self.is_path_allowed(file_path, "read"):
            return f"# Access denied: {file_path} is protected"
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            return self.redact_sensitive_content(content)
        except Exception as e:
            return f"# Error reading {file_path}: {e}"
    
    def handle_before_write_file(self, file_path: str) -> bool:
        """Handle beforeWriteFile hook"""
        if not self.is_path_allowed(file_path, "write"):
            print(f"Write blocked: {file_path} is not in whitelist")
            return False
        return True
    
    def handle_before_shell_execution(self, command: str) -> bool:
        """Handle beforeShellExecution hook"""
        if not self.is_shell_command_allowed(command):
            print(f"Shell command blocked: {command}")
            return False
        return True
    
    def handle_stop(self) -> None:
        """Handle stop hook"""
        files, lines = self.calculate_change_size()
        maturity = self.config["maturity"]
        budget = self.config["budgets"][maturity]
        
        print(f"Change size: {files} files, {lines} lines")
        print(f"Maturity: {maturity} (budget: {budget['max_files']} files, {budget['max_lines']} lines)")
        
        if files <= budget["max_files"] and lines <= budget["max_lines"]:
            if self.commit_and_merge():
                print("✅ Changes committed and merged to develop")
            else:
                print("❌ Failed to commit and merge")
        else:
            print("⚠️  Changes exceed budget - manual review required")
            print("Changes are staged but not committed")

def main():
    if len(sys.argv) < 2:
        print("Usage: solo-guard.py <hook_type> [args...]")
        sys.exit(1)
    
    hook_type = sys.argv[1]
    guard = SoloGuard()
    
    if hook_type == "beforeSubmitPrompt":
        prompt = sys.argv[2] if len(sys.argv) > 2 else ""
        guard.handle_before_submit_prompt(prompt)
    elif hook_type == "beforeReadFile":
        file_path = sys.argv[2] if len(sys.argv) > 2 else ""
        result = guard.handle_before_read_file(file_path)
        print(result)
    elif hook_type == "beforeWriteFile":
        file_path = sys.argv[2] if len(sys.argv) > 2 else ""
        success = guard.handle_before_write_file(file_path)
        sys.exit(0 if success else 1)
    elif hook_type == "beforeShellExecution":
        command = sys.argv[2] if len(sys.argv) > 2 else ""
        success = guard.handle_before_shell_execution(command)
        sys.exit(0 if success else 1)
    elif hook_type == "stop":
        guard.handle_stop()
    else:
        print(f"Unknown hook type: {hook_type}")
        sys.exit(1)

if __name__ == "__main__":
    main()
