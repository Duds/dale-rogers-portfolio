try {
  (() => {
    var me = Object.create;
    var Q = Object.defineProperty;
    var he = Object.getOwnPropertyDescriptor;
    var fe = Object.getOwnPropertyNames;
    var ge = Object.getPrototypeOf,
      be = Object.prototype.hasOwnProperty;
    var O = ((e) =>
      typeof require < "u"
        ? require
        : typeof Proxy < "u"
          ? new Proxy(e, {
              get: (o, l) => (typeof require < "u" ? require : o)[l],
            })
          : e)(function (e) {
      if (typeof require < "u") return require.apply(this, arguments);
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
    var N = (e, o) => () => (e && (o = e((e = 0))), o);
    var ye = (e, o) => () => (
      o || e((o = { exports: {} }).exports, o),
      o.exports
    );
    var we = (e, o, l, s) => {
      if ((o && typeof o == "object") || typeof o == "function")
        for (let a of fe(o))
          !be.call(e, a) &&
            a !== l &&
            Q(e, a, {
              get: () => o[a],
              enumerable: !(s = he(o, a)) || s.enumerable,
            });
      return e;
    };
    var Se = (e, o, l) => (
      (l = e != null ? me(ge(e)) : {}),
      we(
        o || !e || !e.__esModule
          ? Q(l, "default", { value: e, enumerable: !0 })
          : l,
        e,
      )
    );
    var f = N(() => {});
    var g = N(() => {});
    var b = N(() => {});
    var ce = ye((ae, Z) => {
      f();
      g();
      b();
      (function (e) {
        if (typeof ae == "object" && typeof Z < "u") Z.exports = e();
        else if (typeof define == "function" && define.amd) define([], e);
        else {
          var o;
          (typeof window < "u" || typeof window < "u"
            ? (o = window)
            : typeof self < "u"
              ? (o = self)
              : (o = this),
            (o.memoizerific = e()));
        }
      })(function () {
        var e, o, l;
        return (function s(a, y, p) {
          function t(n, I) {
            if (!y[n]) {
              if (!a[n]) {
                var r = typeof O == "function" && O;
                if (!I && r) return r(n, !0);
                if (i) return i(n, !0);
                var d = new Error("Cannot find module '" + n + "'");
                throw ((d.code = "MODULE_NOT_FOUND"), d);
              }
              var u = (y[n] = { exports: {} });
              a[n][0].call(
                u.exports,
                function (h) {
                  var w = a[n][1][h];
                  return t(w || h);
                },
                u,
                u.exports,
                s,
                a,
                y,
                p,
              );
            }
            return y[n].exports;
          }
          for (var i = typeof O == "function" && O, m = 0; m < p.length; m++)
            t(p[m]);
          return t;
        })(
          {
            1: [
              function (s, a, y) {
                a.exports = function (p) {
                  if (typeof Map != "function" || p) {
                    var t = s("./similar");
                    return new t();
                  } else return new Map();
                };
              },
              { "./similar": 2 },
            ],
            2: [
              function (s, a, y) {
                function p() {
                  return (
                    (this.list = []),
                    (this.lastItem = void 0),
                    (this.size = 0),
                    this
                  );
                }
                ((p.prototype.get = function (t) {
                  var i;
                  if (this.lastItem && this.isEqual(this.lastItem.key, t))
                    return this.lastItem.val;
                  if (((i = this.indexOf(t)), i >= 0))
                    return ((this.lastItem = this.list[i]), this.list[i].val);
                }),
                  (p.prototype.set = function (t, i) {
                    var m;
                    return this.lastItem && this.isEqual(this.lastItem.key, t)
                      ? ((this.lastItem.val = i), this)
                      : ((m = this.indexOf(t)),
                        m >= 0
                          ? ((this.lastItem = this.list[m]),
                            (this.list[m].val = i),
                            this)
                          : ((this.lastItem = { key: t, val: i }),
                            this.list.push(this.lastItem),
                            this.size++,
                            this));
                  }),
                  (p.prototype.delete = function (t) {
                    var i;
                    if (
                      (this.lastItem &&
                        this.isEqual(this.lastItem.key, t) &&
                        (this.lastItem = void 0),
                      (i = this.indexOf(t)),
                      i >= 0)
                    )
                      return (this.size--, this.list.splice(i, 1)[0]);
                  }),
                  (p.prototype.has = function (t) {
                    var i;
                    return this.lastItem && this.isEqual(this.lastItem.key, t)
                      ? !0
                      : ((i = this.indexOf(t)),
                        i >= 0 ? ((this.lastItem = this.list[i]), !0) : !1);
                  }),
                  (p.prototype.forEach = function (t, i) {
                    var m;
                    for (m = 0; m < this.size; m++)
                      t.call(
                        i || this,
                        this.list[m].val,
                        this.list[m].key,
                        this,
                      );
                  }),
                  (p.prototype.indexOf = function (t) {
                    var i;
                    for (i = 0; i < this.size; i++)
                      if (this.isEqual(this.list[i].key, t)) return i;
                    return -1;
                  }),
                  (p.prototype.isEqual = function (t, i) {
                    return t === i || (t !== t && i !== i);
                  }),
                  (a.exports = p));
              },
              {},
            ],
            3: [
              function (s, a, y) {
                var p = s("map-or-similar");
                a.exports = function (n) {
                  var I = new p(!1),
                    r = [];
                  return function (d) {
                    var u = function () {
                      var h = I,
                        w,
                        E,
                        S = arguments.length - 1,
                        M = Array(S + 1),
                        A = !0,
                        _;
                      if ((u.numArgs || u.numArgs === 0) && u.numArgs !== S + 1)
                        throw new Error(
                          "Memoizerific functions should always be called with the same number of arguments",
                        );
                      for (_ = 0; _ < S; _++) {
                        if (
                          ((M[_] = { cacheItem: h, arg: arguments[_] }),
                          h.has(arguments[_]))
                        ) {
                          h = h.get(arguments[_]);
                          continue;
                        }
                        ((A = !1),
                          (w = new p(!1)),
                          h.set(arguments[_], w),
                          (h = w));
                      }
                      return (
                        A &&
                          (h.has(arguments[S])
                            ? (E = h.get(arguments[S]))
                            : (A = !1)),
                        A ||
                          ((E = d.apply(null, arguments)),
                          h.set(arguments[S], E)),
                        n > 0 &&
                          ((M[S] = { cacheItem: h, arg: arguments[S] }),
                          A ? t(r, M) : r.push(M),
                          r.length > n && i(r.shift())),
                        (u.wasMemoized = A),
                        (u.numArgs = S + 1),
                        E
                      );
                    };
                    return (
                      (u.limit = n),
                      (u.wasMemoized = !1),
                      (u.cache = I),
                      (u.lru = r),
                      u
                    );
                  };
                };
                function t(n, I) {
                  var r = n.length,
                    d = I.length,
                    u,
                    h,
                    w;
                  for (h = 0; h < r; h++) {
                    for (u = !0, w = 0; w < d; w++)
                      if (!m(n[h][w].arg, I[w].arg)) {
                        u = !1;
                        break;
                      }
                    if (u) break;
                  }
                  n.push(n.splice(h, 1)[0]);
                }
                function i(n) {
                  var I = n.length,
                    r = n[I - 1],
                    d,
                    u;
                  for (
                    r.cacheItem.delete(r.arg), u = I - 2;
                    u >= 0 &&
                    ((r = n[u]), (d = r.cacheItem.get(r.arg)), !d || !d.size);
                    u--
                  )
                    r.cacheItem.delete(r.arg);
                }
                function m(n, I) {
                  return n === I || (n !== n && I !== I);
                }
              },
              { "map-or-similar": 1 },
            ],
          },
          {},
          [3],
        )(3);
      });
    });
    f();
    g();
    b();
    f();
    g();
    b();
    f();
    g();
    b();
    f();
    g();
    b();
    var c = __REACT__,
      {
        Children: Je,
        Component: Qe,
        Fragment: V,
        Profiler: $e,
        PureComponent: Xe,
        StrictMode: eo,
        Suspense: oo,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: to,
        cloneElement: no,
        createContext: ro,
        createElement: U,
        createFactory: io,
        createRef: lo,
        forwardRef: ao,
        isValidElement: co,
        lazy: so,
        memo: $,
        startTransition: uo,
        unstable_act: po,
        useCallback: X,
        useContext: Io,
        useDebugValue: mo,
        useDeferredValue: ho,
        useEffect: x,
        useId: fo,
        useImperativeHandle: go,
        useInsertionEffect: bo,
        useLayoutEffect: yo,
        useMemo: wo,
        useReducer: So,
        useRef: ee,
        useState: z,
        useSyncExternalStore: vo,
        useTransition: _o,
        version: Co,
      } = __REACT__;
    f();
    g();
    b();
    var Ao = __STORYBOOK_API__,
      {
        ActiveTabs: Ro,
        Consumer: Oo,
        ManagerContext: xo,
        Provider: Lo,
        RequestResponseError: Po,
        addons: H,
        combineParameters: Bo,
        controlOrMetaKey: Mo,
        controlOrMetaSymbol: Vo,
        eventMatchesShortcut: Do,
        eventToShortcut: No,
        experimental_MockUniversalStore: Uo,
        experimental_UniversalStore: zo,
        experimental_requestResponse: Ho,
        experimental_useUniversalStore: Go,
        isMacLike: Fo,
        isShortcutTaken: qo,
        keyToSymbol: Wo,
        merge: Yo,
        mockChannel: jo,
        optionOrAltSymbol: Ko,
        shortcutMatchesShortcut: Zo,
        shortcutToHumanString: Jo,
        types: oe,
        useAddonState: Qo,
        useArgTypes: $o,
        useArgs: Xo,
        useChannel: et,
        useGlobalTypes: ot,
        useGlobals: G,
        useParameter: F,
        useSharedState: tt,
        useStoryPrepared: nt,
        useStorybookApi: te,
        useStorybookState: rt,
      } = __STORYBOOK_API__;
    f();
    g();
    b();
    var st = __STORYBOOK_COMPONENTS__,
      {
        A: dt,
        ActionBar: ut,
        AddonPanel: pt,
        Badge: It,
        Bar: mt,
        Blockquote: ht,
        Button: ft,
        ClipboardCode: gt,
        Code: bt,
        DL: yt,
        Div: wt,
        DocumentWrapper: St,
        EmptyTabContent: vt,
        ErrorFormatter: _t,
        FlexBar: Ct,
        Form: kt,
        H1: Tt,
        H2: Et,
        H3: At,
        H4: Rt,
        H5: Ot,
        H6: xt,
        HR: Lt,
        IconButton: L,
        IconButtonSkeleton: Pt,
        Icons: Bt,
        Img: Mt,
        LI: Vt,
        Link: Dt,
        ListItem: Nt,
        Loader: Ut,
        Modal: zt,
        OL: Ht,
        P: Gt,
        Placeholder: Ft,
        Pre: qt,
        ProgressSpinner: Wt,
        ResetWrapper: Yt,
        ScrollArea: jt,
        Separator: Kt,
        Spaced: Zt,
        Span: Jt,
        StorybookIcon: Qt,
        StorybookLogo: $t,
        Symbols: Xt,
        SyntaxHighlighter: en,
        TT: on,
        TabBar: tn,
        TabButton: nn,
        TabWrapper: rn,
        Table: ln,
        Tabs: an,
        TabsState: cn,
        TooltipLinkList: q,
        TooltipMessage: sn,
        TooltipNote: dn,
        UL: un,
        WithTooltip: W,
        WithTooltipPure: pn,
        Zoom: In,
        codeCommon: mn,
        components: hn,
        createCopyToClipboardFunction: fn,
        getStoryHref: gn,
        icons: bn,
        interleaveSeparators: yn,
        nameSpaceClassNames: wn,
        resetComponents: Sn,
        withReset: vn,
      } = __STORYBOOK_COMPONENTS__;
    f();
    g();
    b();
    var En = __STORYBOOK_THEMING__,
      {
        CacheProvider: An,
        ClassNames: Rn,
        Global: Y,
        ThemeProvider: On,
        background: xn,
        color: Ln,
        convert: Pn,
        create: Bn,
        createCache: Mn,
        createGlobal: Vn,
        createReset: Dn,
        css: Nn,
        darken: Un,
        ensure: zn,
        ignoreSsrWarning: Hn,
        isPropValid: Gn,
        jsx: Fn,
        keyframes: qn,
        lighten: Wn,
        styled: v,
        themes: Yn,
        typography: jn,
        useTheme: Kn,
        withTheme: Zn,
      } = __STORYBOOK_THEMING__;
    f();
    g();
    b();
    var er = __STORYBOOK_ICONS__,
      {
        AccessibilityAltIcon: or,
        AccessibilityIcon: tr,
        AccessibilityIgnoredIcon: nr,
        AddIcon: rr,
        AdminIcon: ir,
        AlertAltIcon: lr,
        AlertIcon: ar,
        AlignLeftIcon: cr,
        AlignRightIcon: sr,
        AppleIcon: dr,
        ArrowBottomLeftIcon: ur,
        ArrowBottomRightIcon: pr,
        ArrowDownIcon: Ir,
        ArrowLeftIcon: mr,
        ArrowRightIcon: hr,
        ArrowSolidDownIcon: fr,
        ArrowSolidLeftIcon: gr,
        ArrowSolidRightIcon: br,
        ArrowSolidUpIcon: yr,
        ArrowTopLeftIcon: wr,
        ArrowTopRightIcon: Sr,
        ArrowUpIcon: vr,
        AzureDevOpsIcon: _r,
        BackIcon: Cr,
        BasketIcon: kr,
        BatchAcceptIcon: Tr,
        BatchDenyIcon: Er,
        BeakerIcon: Ar,
        BellIcon: Rr,
        BitbucketIcon: Or,
        BoldIcon: xr,
        BookIcon: Lr,
        BookmarkHollowIcon: Pr,
        BookmarkIcon: Br,
        BottomBarIcon: Mr,
        BottomBarToggleIcon: Vr,
        BoxIcon: Dr,
        BranchIcon: Nr,
        BrowserIcon: ne,
        ButtonIcon: Ur,
        CPUIcon: zr,
        CalendarIcon: Hr,
        CameraIcon: Gr,
        CameraStabilizeIcon: Fr,
        CategoryIcon: qr,
        CertificateIcon: Wr,
        ChangedIcon: Yr,
        ChatIcon: jr,
        CheckIcon: Kr,
        ChevronDownIcon: Zr,
        ChevronLeftIcon: Jr,
        ChevronRightIcon: Qr,
        ChevronSmallDownIcon: $r,
        ChevronSmallLeftIcon: Xr,
        ChevronSmallRightIcon: ei,
        ChevronSmallUpIcon: oi,
        ChevronUpIcon: ti,
        ChromaticIcon: ni,
        ChromeIcon: ri,
        CircleHollowIcon: ii,
        CircleIcon: li,
        ClearIcon: ai,
        CloseAltIcon: ci,
        CloseIcon: si,
        CloudHollowIcon: di,
        CloudIcon: ui,
        CogIcon: pi,
        CollapseIcon: Ii,
        CommandIcon: mi,
        CommentAddIcon: hi,
        CommentIcon: fi,
        CommentsIcon: gi,
        CommitIcon: bi,
        CompassIcon: yi,
        ComponentDrivenIcon: wi,
        ComponentIcon: Si,
        ContrastIcon: vi,
        ContrastIgnoredIcon: _i,
        ControlsIcon: Ci,
        CopyIcon: ki,
        CreditIcon: Ti,
        CrossIcon: Ei,
        DashboardIcon: Ai,
        DatabaseIcon: Ri,
        DeleteIcon: Oi,
        DiamondIcon: xi,
        DirectionIcon: Li,
        DiscordIcon: Pi,
        DocChartIcon: Bi,
        DocListIcon: Mi,
        DocumentIcon: Vi,
        DownloadIcon: Di,
        DragIcon: Ni,
        EditIcon: Ui,
        EllipsisIcon: zi,
        EmailIcon: Hi,
        ExpandAltIcon: Gi,
        ExpandIcon: Fi,
        EyeCloseIcon: qi,
        EyeIcon: Wi,
        FaceHappyIcon: Yi,
        FaceNeutralIcon: ji,
        FaceSadIcon: Ki,
        FacebookIcon: Zi,
        FailedIcon: Ji,
        FastForwardIcon: Qi,
        FigmaIcon: $i,
        FilterIcon: Xi,
        FlagIcon: el,
        FolderIcon: ol,
        FormIcon: tl,
        GDriveIcon: nl,
        GithubIcon: rl,
        GitlabIcon: il,
        GlobeIcon: ll,
        GoogleIcon: al,
        GraphBarIcon: cl,
        GraphLineIcon: sl,
        GraphqlIcon: dl,
        GridAltIcon: ul,
        GridIcon: pl,
        GrowIcon: j,
        HeartHollowIcon: Il,
        HeartIcon: ml,
        HomeIcon: hl,
        HourglassIcon: fl,
        InfoIcon: gl,
        ItalicIcon: bl,
        JumpToIcon: yl,
        KeyIcon: wl,
        LightningIcon: Sl,
        LightningOffIcon: vl,
        LinkBrokenIcon: _l,
        LinkIcon: Cl,
        LinkedinIcon: kl,
        LinuxIcon: Tl,
        ListOrderedIcon: El,
        ListUnorderedIcon: Al,
        LocationIcon: Rl,
        LockIcon: Ol,
        MarkdownIcon: xl,
        MarkupIcon: Ll,
        MediumIcon: Pl,
        MemoryIcon: Bl,
        MenuIcon: Ml,
        MergeIcon: Vl,
        MirrorIcon: Dl,
        MobileIcon: re,
        MoonIcon: Nl,
        NutIcon: Ul,
        OutboxIcon: zl,
        OutlineIcon: Hl,
        PaintBrushIcon: Gl,
        PaperClipIcon: Fl,
        ParagraphIcon: ql,
        PassedIcon: Wl,
        PhoneIcon: Yl,
        PhotoDragIcon: jl,
        PhotoIcon: Kl,
        PhotoStabilizeIcon: Zl,
        PinAltIcon: Jl,
        PinIcon: Ql,
        PlayAllHollowIcon: $l,
        PlayBackIcon: Xl,
        PlayHollowIcon: ea,
        PlayIcon: oa,
        PlayNextIcon: ta,
        PlusIcon: na,
        PointerDefaultIcon: ra,
        PointerHandIcon: ia,
        PowerIcon: la,
        PrintIcon: aa,
        ProceedIcon: ca,
        ProfileIcon: sa,
        PullRequestIcon: da,
        QuestionIcon: ua,
        RSSIcon: pa,
        RedirectIcon: Ia,
        ReduxIcon: ma,
        RefreshIcon: ie,
        ReplyIcon: ha,
        RepoIcon: fa,
        RequestChangeIcon: ga,
        RewindIcon: ba,
        RulerIcon: ya,
        SaveIcon: wa,
        SearchIcon: Sa,
        ShareAltIcon: va,
        ShareIcon: _a,
        ShieldIcon: Ca,
        SideBySideIcon: ka,
        SidebarAltIcon: Ta,
        SidebarAltToggleIcon: Ea,
        SidebarIcon: Aa,
        SidebarToggleIcon: Ra,
        SpeakerIcon: Oa,
        StackedIcon: xa,
        StarHollowIcon: La,
        StarIcon: Pa,
        StatusFailIcon: Ba,
        StatusIcon: Ma,
        StatusPassIcon: Va,
        StatusWarnIcon: Da,
        StickerIcon: Na,
        StopAltHollowIcon: Ua,
        StopAltIcon: za,
        StopIcon: Ha,
        StorybookIcon: Ga,
        StructureIcon: Fa,
        SubtractIcon: qa,
        SunIcon: Wa,
        SupportIcon: Ya,
        SweepIcon: ja,
        SwitchAltIcon: Ka,
        SyncIcon: Za,
        TabletIcon: le,
        ThumbsUpIcon: Ja,
        TimeIcon: Qa,
        TimerIcon: $a,
        TransferIcon: K,
        TrashIcon: Xa,
        TwitterIcon: ec,
        TypeIcon: oc,
        UbuntuIcon: tc,
        UndoIcon: nc,
        UnfoldIcon: rc,
        UnlockIcon: ic,
        UnpinIcon: lc,
        UploadIcon: ac,
        UserAddIcon: cc,
        UserAltIcon: sc,
        UserIcon: dc,
        UsersIcon: uc,
        VSCodeIcon: pc,
        VerifiedIcon: Ic,
        VideoIcon: mc,
        WandIcon: hc,
        WatchIcon: fc,
        WindowsIcon: gc,
        WrenchIcon: bc,
        XIcon: yc,
        YoutubeIcon: wc,
        ZoomIcon: Sc,
        ZoomOutIcon: vc,
        ZoomResetIcon: _c,
        iconList: Cc,
      } = __STORYBOOK_ICONS__;
    var J = Se(ce()),
      P = "storybook/viewport",
      R = "viewport",
      ue = {
        mobile1: {
          name: "Small mobile",
          styles: { height: "568px", width: "320px" },
          type: "mobile",
        },
        mobile2: {
          name: "Large mobile",
          styles: { height: "896px", width: "414px" },
          type: "mobile",
        },
        tablet: {
          name: "Tablet",
          styles: { height: "1112px", width: "834px" },
          type: "tablet",
        },
      },
      B = {
        name: "Reset viewport",
        styles: { height: "100%", width: "100%" },
        type: "desktop",
      },
      _e = { [R]: { value: void 0, isRotated: !1 } },
      Ce = { viewport: "reset", viewportRotated: !1 },
      ke = globalThis.FEATURES?.viewportStoryGlobals ? _e : Ce,
      pe = (e, o) => e.indexOf(o),
      Te = (e, o) => {
        let l = pe(e, o);
        return l === e.length - 1 ? e[0] : e[l + 1];
      },
      Ee = (e, o) => {
        let l = pe(e, o);
        return l < 1 ? e[e.length - 1] : e[l - 1];
      },
      Ie = async (e, o, l, s) => {
        (await e.setAddonShortcut(P, {
          label: "Previous viewport",
          defaultShortcut: ["alt", "shift", "V"],
          actionName: "previous",
          action: () => {
            l({ viewport: Ee(s, o) });
          },
        }),
          await e.setAddonShortcut(P, {
            label: "Next viewport",
            defaultShortcut: ["alt", "V"],
            actionName: "next",
            action: () => {
              l({ viewport: Te(s, o) });
            },
          }),
          await e.setAddonShortcut(P, {
            label: "Reset viewport",
            defaultShortcut: ["alt", "control", "V"],
            actionName: "reset",
            action: () => {
              l(ke);
            },
          }));
      },
      Ae = v.div({ display: "inline-flex", alignItems: "center" }),
      se = v.div(({ theme: e }) => ({
        display: "inline-block",
        textDecoration: "none",
        padding: 10,
        fontWeight: e.typography.weight.bold,
        fontSize: e.typography.size.s2 - 1,
        lineHeight: "1",
        height: 40,
        border: "none",
        borderTop: "3px solid transparent",
        borderBottom: "3px solid transparent",
        background: "transparent",
      })),
      Re = v(L)(() => ({ display: "inline-flex", alignItems: "center" })),
      Oe = v.div(({ theme: e }) => ({
        fontSize: e.typography.size.s2 - 1,
        marginLeft: 10,
      })),
      xe = {
        desktop: c.createElement(ne, null),
        mobile: c.createElement(re, null),
        tablet: c.createElement(le, null),
        other: c.createElement(V, null),
      },
      Le = ({ api: e }) => {
        let o = F(R),
          [l, s, a] = G(),
          [y, p] = z(!1),
          { options: t = ue, disable: i } = o || {},
          m = l?.[R] || {},
          n = m.value,
          I = m.isRotated,
          r = t[n] || B,
          d = y || r !== B,
          u = R in a,
          h = Object.keys(t).length;
        if (
          (x(() => {
            Ie(e, n, s, Object.keys(t));
          }, [t, n, s, e]),
          r.styles === null || !t || h < 1)
        )
          return null;
        if (typeof r.styles == "function")
          return (
            console.warn(
              "Addon Viewport no longer supports dynamic styles using a function, use css calc() instead",
            ),
            null
          );
        let w = I ? r.styles.height : r.styles.width,
          E = I ? r.styles.width : r.styles.height;
        return i
          ? null
          : c.createElement(Pe, {
              item: r,
              updateGlobals: s,
              viewportMap: t,
              viewportName: n,
              isRotated: I,
              setIsTooltipVisible: p,
              isLocked: u,
              isActive: d,
              width: w,
              height: E,
            });
      },
      Pe = c.memo(function (e) {
        let {
            item: o,
            viewportMap: l,
            viewportName: s,
            isRotated: a,
            updateGlobals: y,
            setIsTooltipVisible: p,
            isLocked: t,
            isActive: i,
            width: m,
            height: n,
          } = e,
          I = X((r) => y({ [R]: r }), [y]);
        return c.createElement(
          V,
          null,
          c.createElement(
            W,
            {
              placement: "bottom",
              tooltip: ({ onHide: r }) =>
                c.createElement(q, {
                  links: [
                    ...(length > 0 && o !== B
                      ? [
                          {
                            id: "reset",
                            title: "Reset viewport",
                            icon: c.createElement(ie, null),
                            onClick: () => {
                              (I({ value: void 0, isRotated: !1 }), r());
                            },
                          },
                        ]
                      : []),
                    ...Object.entries(l).map(([d, u]) => ({
                      id: d,
                      title: u.name,
                      icon: xe[u.type],
                      active: d === s,
                      onClick: () => {
                        (I({ value: d, isRotated: !1 }), r());
                      },
                    })),
                  ].flat(),
                }),
              closeOnOutsideClick: !0,
              onVisibleChange: p,
            },
            c.createElement(
              Re,
              {
                disabled: t,
                key: "viewport",
                title: "Change the size of the preview",
                active: i,
                onDoubleClick: () => {
                  I({ value: void 0, isRotated: !1 });
                },
              },
              c.createElement(j, null),
              o !== B
                ? c.createElement(Oe, null, o.name, " ", a ? "(L)" : "(P)")
                : null,
            ),
          ),
          c.createElement(Y, {
            styles: {
              'iframe[data-is-storybook="true"]': { width: m, height: n },
            },
          }),
          o !== B
            ? c.createElement(
                Ae,
                null,
                c.createElement(
                  se,
                  { title: "Viewport width" },
                  m.replace("px", ""),
                ),
                t
                  ? "/"
                  : c.createElement(
                      L,
                      {
                        key: "viewport-rotate",
                        title: "Rotate viewport",
                        onClick: () => {
                          I({ value: s, isRotated: !a });
                        },
                      },
                      c.createElement(K, null),
                    ),
                c.createElement(
                  se,
                  { title: "Viewport height" },
                  n.replace("px", ""),
                ),
              )
            : null,
        );
      }),
      Be = (0, J.default)(50)((e) => [
        ...Me,
        ...Object.entries(e).map(([o, { name: l, ...s }]) => ({
          ...s,
          id: o,
          title: l,
        })),
      ]),
      D = { id: "reset", title: "Reset viewport", styles: null, type: "other" },
      Me = [D],
      Ve = (0, J.default)(50)((e, o, l, s) =>
        e
          .filter((a) => a.id !== D.id || o.id !== a.id)
          .map((a) => ({
            ...a,
            onClick: () => {
              (l({ viewport: a.id }), s());
            },
          })),
      ),
      De = ({ width: e, height: o, ...l }) => ({ ...l, height: e, width: o }),
      Ne = v.div({ display: "inline-flex", alignItems: "center" }),
      de = v.div(({ theme: e }) => ({
        display: "inline-block",
        textDecoration: "none",
        padding: 10,
        fontWeight: e.typography.weight.bold,
        fontSize: e.typography.size.s2 - 1,
        lineHeight: "1",
        height: 40,
        border: "none",
        borderTop: "3px solid transparent",
        borderBottom: "3px solid transparent",
        background: "transparent",
      })),
      Ue = v(L)(() => ({ display: "inline-flex", alignItems: "center" })),
      ze = v.div(({ theme: e }) => ({
        fontSize: e.typography.size.s2 - 1,
        marginLeft: 10,
      })),
      He = (e, o, l) => {
        if (o === null) return;
        let s = typeof o == "function" ? o(e) : o;
        return l ? De(s) : s;
      },
      Ge = $(function () {
        let [e, o] = G(),
          {
            viewports: l = ue,
            defaultOrientation: s,
            defaultViewport: a,
            disable: y,
          } = F(R, {}),
          p = Be(l),
          t = te(),
          [i, m] = z(!1);
        (a &&
          !p.find((d) => d.id === a) &&
          console.warn(
            `Cannot find "defaultViewport" of "${a}" in addon-viewport configs, please check the "viewports" setting in the configuration.`,
          ),
          x(() => {
            Ie(t, e, o, Object.keys(l));
          }, [l, e, e.viewport, o, t]),
          x(() => {
            let d = s === "landscape";
            ((a && e.viewport !== a) || (s && e.viewportRotated !== d)) &&
              o({ viewport: a, viewportRotated: d });
          }, [s, a, o]));
        let n =
            p.find((d) => d.id === e.viewport) ||
            p.find((d) => d.id === a) ||
            p.find((d) => d.default) ||
            D,
          I = ee(),
          r = He(I.current, n.styles, e.viewportRotated);
        return (
          x(() => {
            I.current = r;
          }, [n]),
          y || Object.entries(l).length === 0
            ? null
            : c.createElement(
                V,
                null,
                c.createElement(
                  W,
                  {
                    placement: "top",
                    tooltip: ({ onHide: d }) =>
                      c.createElement(q, { links: Ve(p, n, o, d) }),
                    closeOnOutsideClick: !0,
                    onVisibleChange: m,
                  },
                  c.createElement(
                    Ue,
                    {
                      key: "viewport",
                      title: "Change the size of the preview",
                      active: i || !!r,
                      onDoubleClick: () => {
                        o({ viewport: D.id });
                      },
                    },
                    c.createElement(j, null),
                    r
                      ? c.createElement(
                          ze,
                          null,
                          e.viewportRotated
                            ? `${n.title} (L)`
                            : `${n.title} (P)`,
                        )
                      : null,
                  ),
                ),
                r
                  ? c.createElement(
                      Ne,
                      null,
                      c.createElement(Y, {
                        styles: {
                          'iframe[data-is-storybook="true"]': {
                            ...(r || { width: "100%", height: "100%" }),
                          },
                        },
                      }),
                      c.createElement(
                        de,
                        { title: "Viewport width" },
                        r.width.replace("px", ""),
                      ),
                      c.createElement(
                        L,
                        {
                          key: "viewport-rotate",
                          title: "Rotate viewport",
                          onClick: () => {
                            o({ viewportRotated: !e.viewportRotated });
                          },
                        },
                        c.createElement(K, null),
                      ),
                      c.createElement(
                        de,
                        { title: "Viewport height" },
                        r.height.replace("px", ""),
                      ),
                    )
                  : null,
              )
        );
      });
    H.register(P, (e) => {
      H.add(P, {
        title: "viewport / media-queries",
        type: oe.TOOL,
        match: ({ viewMode: o, tabId: l }) => o === "story" && !l,
        render: () =>
          FEATURES?.viewportStoryGlobals ? U(Le, { api: e }) : U(Ge, null),
      });
    });
  })();
} catch (e) {
  console.error(
    "[Storybook] One of your manager-entries failed: " + import.meta.url,
    e,
  );
}
