import { R as v } from "./index-Dv7uYCMj.js";
import { c as ne } from "./utils-DuMXYCiK.js";
import "./_commonjsHelpers-CqkleIqs.js";
const e = v.forwardRef(
  (
    {
      className: p,
      variant: X = "default",
      size: Y = "default",
      children: Z,
      ...ee
    },
    te,
  ) => {
    const ae =
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      re = {
        default: "bg-primary text-white hover:bg-primary/90",
        destructive: "bg-error text-white hover:bg-error/90",
        outline:
          "border border-grey-300 bg-white hover:bg-accent hover:text-white",
        secondary: "bg-secondary text-white hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-white",
        link: "text-primary underline-offset-4 hover:underline",
      },
      se = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      };
    return v.createElement(
      "button",
      { className: ne(ae, re[X], se[Y], p), ref: te, ...ee },
      Z,
    );
  },
);
e.displayName = "Button";
try {
  ((e.displayName = "Button"),
    (e.__docgenInfo = {
      description: "",
      displayName: "Button",
      props: {
        variant: {
          defaultValue: { value: "default" },
          description: "",
          name: "variant",
          required: !1,
          type: {
            name: "enum",
            value: [
              { value: "undefined" },
              { value: '"default"' },
              { value: '"destructive"' },
              { value: '"outline"' },
              { value: '"secondary"' },
              { value: '"ghost"' },
              { value: '"link"' },
            ],
          },
        },
        size: {
          defaultValue: { value: "default" },
          description: "",
          name: "size",
          required: !1,
          type: {
            name: "enum",
            value: [
              { value: "undefined" },
              { value: '"default"' },
              { value: '"sm"' },
              { value: '"lg"' },
              { value: '"icon"' },
            ],
          },
        },
      },
    }));
} catch {}
const le = {
    title: "UI/Button",
    component: e,
    parameters: {
      layout: "centered",
      docs: {
        description: {
          component:
            "A versatile button component with multiple variants and sizes.",
        },
      },
    },
    tags: ["autodocs"],
    argTypes: {
      variant: {
        control: { type: "select" },
        options: [
          "default",
          "destructive",
          "outline",
          "secondary",
          "ghost",
          "link",
        ],
        description: "The visual style variant of the button",
      },
      size: {
        control: { type: "select" },
        options: ["default", "sm", "lg", "icon"],
        description: "The size of the button",
      },
      disabled: {
        control: { type: "boolean" },
        description: "Whether the button is disabled",
      },
      children: {
        control: { type: "text" },
        description: "The content to display inside the button",
      },
    },
    args: {
      children: "Button",
      variant: "default",
      size: "default",
      disabled: !1,
    },
  },
  t = { args: { variant: "default" } },
  a = { args: { variant: "secondary" } },
  r = { args: { variant: "destructive" } },
  s = { args: { variant: "outline" } },
  n = { args: { variant: "ghost" } },
  o = { args: { variant: "link" } },
  i = { args: { size: "sm" } },
  c = { args: { size: "lg" } },
  l = { args: { size: "icon", children: "🔍" } },
  d = { args: { disabled: !0 } },
  u = {
    render: () =>
      React.createElement(
        "div",
        { className: "flex flex-wrap gap-4" },
        React.createElement(e, { variant: "default" }, "Default"),
        React.createElement(e, { variant: "secondary" }, "Secondary"),
        React.createElement(e, { variant: "destructive" }, "Destructive"),
        React.createElement(e, { variant: "outline" }, "Outline"),
        React.createElement(e, { variant: "ghost" }, "Ghost"),
        React.createElement(e, { variant: "link" }, "Link"),
      ),
    parameters: {
      docs: {
        description: {
          story: "All button variants displayed together for comparison.",
        },
      },
    },
  },
  m = {
    render: () =>
      React.createElement(
        "div",
        { className: "flex items-center gap-4" },
        React.createElement(e, { size: "sm" }, "Small"),
        React.createElement(e, { size: "default" }, "Default"),
        React.createElement(e, { size: "lg" }, "Large"),
        React.createElement(e, { size: "icon" }, "🔍"),
      ),
    parameters: {
      docs: {
        description: {
          story: "All button sizes displayed together for comparison.",
        },
      },
    },
  };
var g, f, h;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((g = t.parameters) == null ? void 0 : g.docs),
    source: {
      originalSource: `{
  args: {
    variant: "default"
  }
}`,
      ...((h = (f = t.parameters) == null ? void 0 : f.docs) == null
        ? void 0
        : h.source),
    },
  },
};
var y, b, B;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((y = a.parameters) == null ? void 0 : y.docs),
    source: {
      originalSource: `{
  args: {
    variant: "secondary"
  }
}`,
      ...((B = (b = a.parameters) == null ? void 0 : b.docs) == null
        ? void 0
        : B.source),
    },
  },
};
var z, S, x;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((z = r.parameters) == null ? void 0 : z.docs),
    source: {
      originalSource: `{
  args: {
    variant: "destructive"
  }
}`,
      ...((x = (S = r.parameters) == null ? void 0 : S.docs) == null
        ? void 0
        : x.source),
    },
  },
};
var R, E, w;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((R = s.parameters) == null ? void 0 : R.docs),
    source: {
      originalSource: `{
  args: {
    variant: "outline"
  }
}`,
      ...((w = (E = s.parameters) == null ? void 0 : E.docs) == null
        ? void 0
        : w.source),
    },
  },
};
var k, D, _;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((k = n.parameters) == null ? void 0 : k.docs),
    source: {
      originalSource: `{
  args: {
    variant: "ghost"
  }
}`,
      ...((_ = (D = n.parameters) == null ? void 0 : D.docs) == null
        ? void 0
        : _.source),
    },
  },
};
var A, L, N;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((A = o.parameters) == null ? void 0 : A.docs),
    source: {
      originalSource: `{
  args: {
    variant: "link"
  }
}`,
      ...((N = (L = o.parameters) == null ? void 0 : L.docs) == null
        ? void 0
        : N.source),
    },
  },
};
var O, G, I;
i.parameters = {
  ...i.parameters,
  docs: {
    ...((O = i.parameters) == null ? void 0 : O.docs),
    source: {
      originalSource: `{
  args: {
    size: "sm"
  }
}`,
      ...((I = (G = i.parameters) == null ? void 0 : G.docs) == null
        ? void 0
        : I.source),
    },
  },
};
var T, V, C;
c.parameters = {
  ...c.parameters,
  docs: {
    ...((T = c.parameters) == null ? void 0 : T.docs),
    source: {
      originalSource: `{
  args: {
    size: "lg"
  }
}`,
      ...((C = (V = c.parameters) == null ? void 0 : V.docs) == null
        ? void 0
        : C.source),
    },
  },
};
var q, j, U;
l.parameters = {
  ...l.parameters,
  docs: {
    ...((q = l.parameters) == null ? void 0 : q.docs),
    source: {
      originalSource: `{
  args: {
    size: "icon",
    children: "🔍"
  }
}`,
      ...((U = (j = l.parameters) == null ? void 0 : j.docs) == null
        ? void 0
        : U.source),
    },
  },
};
var W, $, F;
d.parameters = {
  ...d.parameters,
  docs: {
    ...((W = d.parameters) == null ? void 0 : W.docs),
    source: {
      originalSource: `{
  args: {
    disabled: true
  }
}`,
      ...((F = ($ = d.parameters) == null ? void 0 : $.docs) == null
        ? void 0
        : F.source),
    },
  },
};
var H, J, K;
u.parameters = {
  ...u.parameters,
  docs: {
    ...((H = u.parameters) == null ? void 0 : H.docs),
    source: {
      originalSource: `{
  render: () => <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "All button variants displayed together for comparison."
      }
    }
  }
}`,
      ...((K = (J = u.parameters) == null ? void 0 : J.docs) == null
        ? void 0
        : K.source),
    },
  },
};
var M, P, Q;
m.parameters = {
  ...m.parameters,
  docs: {
    ...((M = m.parameters) == null ? void 0 : M.docs),
    source: {
      originalSource: `{
  render: () => <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🔍</Button>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "All button sizes displayed together for comparison."
      }
    }
  }
}`,
      ...((Q = (P = m.parameters) == null ? void 0 : P.docs) == null
        ? void 0
        : Q.source),
    },
  },
};
const de = [
  "Default",
  "Secondary",
  "Destructive",
  "Outline",
  "Ghost",
  "Link",
  "Small",
  "Large",
  "Icon",
  "Disabled",
  "AllVariants",
  "AllSizes",
];
export {
  m as AllSizes,
  u as AllVariants,
  t as Default,
  r as Destructive,
  d as Disabled,
  n as Ghost,
  l as Icon,
  c as Large,
  o as Link,
  s as Outline,
  a as Secondary,
  i as Small,
  de as __namedExportsOrder,
  le as default,
};
