import { R as r } from "./index-Dv7uYCMj.js";
import { c as K } from "./utils-DuMXYCiK.js";
import "./_commonjsHelpers-CqkleIqs.js";
const e = ({ title: t, clickable: a = !1, href: u, class: J, children: h }) => {
  const x = K(
    "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm",
    a ? "cursor-pointer hover:shadow-md transition-shadow" : "",
    J,
  );
  return u
    ? r.createElement(
        "a",
        { href: u, className: x },
        t &&
          r.createElement(
            "h3",
            {
              className:
                "text-lg font-semibold text-gray-900 dark:text-white mb-3",
            },
            t,
          ),
        h,
      )
    : r.createElement(
        "div",
        { className: x },
        t &&
          r.createElement(
            "h3",
            {
              className:
                "text-lg font-semibold text-gray-900 dark:text-white mb-3",
            },
            t,
          ),
        h,
      );
};
try {
  ((e.displayName = "Card"),
    (e.__docgenInfo = {
      description: "",
      displayName: "Card",
      props: {
        title: {
          defaultValue: null,
          description: "",
          name: "title",
          required: !1,
          type: { name: "string | undefined" },
        },
        clickable: {
          defaultValue: { value: "false" },
          description: "",
          name: "clickable",
          required: !1,
          type: { name: "boolean | undefined" },
        },
        href: {
          defaultValue: null,
          description: "",
          name: "href",
          required: !1,
          type: { name: "string | undefined" },
        },
        class: {
          defaultValue: null,
          description: "",
          name: "class",
          required: !1,
          type: { name: "string | undefined" },
        },
      },
    }));
} catch {}
const ee = {
    title: "UI/Card",
    component: e,
    parameters: {
      layout: "centered",
      docs: {
        description: {
          component:
            "A versatile card component that can display content with optional clickable functionality and various styling options.",
        },
      },
    },
    tags: ["autodocs"],
    argTypes: {
      title: {
        control: { type: "text" },
        description: "The title displayed at the top of the card",
      },
      clickable: {
        control: { type: "boolean" },
        description:
          "Whether the card should appear clickable with hover effects",
      },
      href: {
        control: { type: "text" },
        description: "Optional URL to make the card a link",
      },
      class: {
        control: { type: "text" },
        description: "Additional CSS classes to apply to the card",
      },
      children: {
        control: { type: "text" },
        description: "The content to display inside the card",
      },
    },
    args: {
      title: "Card Title",
      clickable: !1,
      href: void 0,
      class: "",
      children:
        "This is the card content. It can contain any HTML elements, text, or other components.",
    },
  },
  s = { args: { title: "Default Card" } },
  n = {
    args: {
      title:
        "This is a very long card title that might wrap to multiple lines to test how the component handles longer text",
    },
  },
  c = { args: { title: void 0 } },
  l = { args: { clickable: !0, title: "Clickable Card" } },
  i = {
    args: {
      href: "#",
      title: "Link Card",
      children: "This card acts as a link. Click to navigate.",
    },
  },
  o = {
    render: (t) =>
      React.createElement(
        e,
        { ...t },
        React.createElement(
          "div",
          { className: "space-y-4" },
          React.createElement(
            "p",
            { className: "text-gray-600" },
            "This card contains rich content with multiple elements.",
          ),
          React.createElement(
            "div",
            { className: "flex gap-2" },
            React.createElement(
              "span",
              {
                className:
                  "px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm",
              },
              "Tag 1",
            ),
            React.createElement(
              "span",
              {
                className:
                  "px-2 py-1 bg-green-100 text-green-800 rounded text-sm",
              },
              "Tag 2",
            ),
          ),
          React.createElement(
            "button",
            {
              className:
                "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
            },
            "Action Button",
          ),
        ),
      ),
    args: { title: "Rich Content Card" },
  },
  d = {
    render: (t) =>
      React.createElement(
        e,
        { ...t },
        React.createElement(
          "div",
          { className: "space-y-4" },
          React.createElement("div", {
            className: "aspect-video bg-gray-200 rounded",
          }),
          React.createElement(
            "h3",
            { className: "text-xl font-semibold" },
            "Case Study Title",
          ),
          React.createElement(
            "p",
            { className: "text-gray-600" },
            "Brief description of the case study and the outcomes achieved.",
          ),
          React.createElement(
            "div",
            { className: "flex gap-2" },
            React.createElement(
              "span",
              {
                className:
                  "px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm",
              },
              "Service Design",
            ),
            React.createElement(
              "span",
              {
                className:
                  "px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm",
              },
              "Strategy",
            ),
          ),
        ),
      ),
    args: { title: "Case Study", clickable: !0 },
  },
  p = {
    render: (t) =>
      React.createElement(
        e,
        { ...t },
        React.createElement(
          "div",
          { className: "text-center space-y-4" },
          React.createElement(
            "div",
            {
              className:
                "w-16 h-16 bg-purple-100 rounded-full mx-auto flex items-center justify-center",
            },
            React.createElement("span", { className: "text-2xl" }, "🎯"),
          ),
          React.createElement(
            "h3",
            { className: "text-lg font-semibold" },
            "Service Name",
          ),
          React.createElement(
            "p",
            { className: "text-gray-600 text-sm" },
            "Description of the service and what it offers to clients.",
          ),
          React.createElement(
            "button",
            {
              className:
                "px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm",
            },
            "Learn More",
          ),
        ),
      ),
    args: { title: void 0, clickable: !1 },
  },
  m = {
    render: () =>
      React.createElement(
        "div",
        {
          className:
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl",
        },
        React.createElement(
          e,
          { title: "Default Card", clickable: !1 },
          "Basic card with title and content.",
        ),
        React.createElement(
          e,
          { title: "Clickable Card", clickable: !0 },
          "Card that appears interactive with hover effects.",
        ),
        React.createElement(
          e,
          { href: "#", title: "Link Card" },
          "Card that acts as a navigation link.",
        ),
        React.createElement(
          e,
          { title: "No Content" },
          "Card with only a title.",
        ),
        React.createElement(
          e,
          { clickable: !0 },
          "Card without title but with content.",
        ),
        React.createElement(
          e,
          {
            title: "Custom Styling",
            class: "border-2 border-purple-300 bg-purple-50",
          },
          "Card with custom CSS classes applied.",
        ),
      ),
    parameters: {
      docs: {
        description: {
          story:
            "All card variants displayed together for comparison and testing.",
        },
      },
    },
  },
  g = {
    render: () =>
      React.createElement(
        "div",
        {
          className:
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl",
        },
        Array.from({ length: 8 }, (t, a) =>
          React.createElement(
            e,
            { key: a, title: `Card ${a + 1}`, clickable: !0 },
            React.createElement(
              "p",
              { className: "text-sm text-gray-600" },
              "This card demonstrates responsive grid behavior across different screen sizes.",
            ),
          ),
        ),
      ),
    parameters: {
      docs: {
        description: {
          story:
            "Responsive grid layout showing how cards adapt to different screen sizes.",
        },
      },
    },
  };
var b, f, y;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((b = s.parameters) == null ? void 0 : b.docs),
    source: {
      originalSource: `{
  args: {
    title: "Default Card"
  }
}`,
      ...((y = (f = s.parameters) == null ? void 0 : f.docs) == null
        ? void 0
        : y.source),
    },
  },
};
var C, v, N;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((C = n.parameters) == null ? void 0 : C.docs),
    source: {
      originalSource: `{
  args: {
    title: "This is a very long card title that might wrap to multiple lines to test how the component handles longer text"
  }
}`,
      ...((N = (v = n.parameters) == null ? void 0 : v.docs) == null
        ? void 0
        : N.source),
    },
  },
};
var k, R, w;
c.parameters = {
  ...c.parameters,
  docs: {
    ...((k = c.parameters) == null ? void 0 : k.docs),
    source: {
      originalSource: `{
  args: {
    title: undefined
  }
}`,
      ...((w = (R = c.parameters) == null ? void 0 : R.docs) == null
        ? void 0
        : w.source),
    },
  },
};
var E, S, T;
l.parameters = {
  ...l.parameters,
  docs: {
    ...((E = l.parameters) == null ? void 0 : E.docs),
    source: {
      originalSource: `{
  args: {
    clickable: true,
    title: "Clickable Card"
  }
}`,
      ...((T = (S = l.parameters) == null ? void 0 : S.docs) == null
        ? void 0
        : T.source),
    },
  },
};
var A, L, _;
i.parameters = {
  ...i.parameters,
  docs: {
    ...((A = i.parameters) == null ? void 0 : A.docs),
    source: {
      originalSource: `{
  args: {
    href: "#",
    title: "Link Card",
    children: "This card acts as a link. Click to navigate."
  }
}`,
      ...((_ = (L = i.parameters) == null ? void 0 : L.docs) == null
        ? void 0
        : _.source),
    },
  },
};
var D, B, V;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((D = o.parameters) == null ? void 0 : D.docs),
    source: {
      originalSource: `{
  render: args => <Card {...args}>
      <div className="space-y-4">
        <p className="text-gray-600">
          This card contains rich content with multiple elements.
        </p>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">Tag 1</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Tag 2</span>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Action Button
        </button>
      </div>
    </Card>,
  args: {
    title: "Rich Content Card"
  }
}`,
      ...((V = (B = o.parameters) == null ? void 0 : B.docs) == null
        ? void 0
        : V.source),
    },
  },
};
var W, q, z;
d.parameters = {
  ...d.parameters,
  docs: {
    ...((W = d.parameters) == null ? void 0 : W.docs),
    source: {
      originalSource: `{
  render: args => <Card {...args}>
      <div className="space-y-4">
        <div className="aspect-video bg-gray-200 rounded"></div>
        <h3 className="text-xl font-semibold">Case Study Title</h3>
        <p className="text-gray-600">
          Brief description of the case study and the outcomes achieved.
        </p>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">Service Design</span>
          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">Strategy</span>
        </div>
      </div>
    </Card>,
  args: {
    title: "Case Study",
    clickable: true
  }
}`,
      ...((z = (q = d.parameters) == null ? void 0 : q.docs) == null
        ? void 0
        : z.source),
    },
  },
};
var I, M, $;
p.parameters = {
  ...p.parameters,
  docs: {
    ...((I = p.parameters) == null ? void 0 : I.docs),
    source: {
      originalSource: `{
  render: args => <Card {...args}>
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto flex items-center justify-center">
          <span className="text-2xl">🎯</span>
        </div>
        <h3 className="text-lg font-semibold">Service Name</h3>
        <p className="text-gray-600 text-sm">
          Description of the service and what it offers to clients.
        </p>
        <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm">
          Learn More
        </button>
      </div>
    </Card>,
  args: {
    title: undefined,
    clickable: false
  }
}`,
      ...(($ = (M = p.parameters) == null ? void 0 : M.docs) == null
        ? void 0
        : $.source),
    },
  },
};
var j, G, O;
m.parameters = {
  ...m.parameters,
  docs: {
    ...((j = m.parameters) == null ? void 0 : j.docs),
    source: {
      originalSource: `{
  render: () => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <Card title="Default Card" clickable={false}>
        Basic card with title and content.
      </Card>

      <Card title="Clickable Card" clickable={true}>
        Card that appears interactive with hover effects.
      </Card>

      <Card href="#" title="Link Card">
        Card that acts as a navigation link.
      </Card>

      <Card title="No Content">
        Card with only a title.
      </Card>

      <Card clickable={true}>
        Card without title but with content.
      </Card>

      <Card title="Custom Styling" class="border-2 border-purple-300 bg-purple-50">
        Card with custom CSS classes applied.
      </Card>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "All card variants displayed together for comparison and testing."
      }
    }
  }
}`,
      ...((O = (G = m.parameters) == null ? void 0 : G.docs) == null
        ? void 0
        : O.source),
    },
  },
};
var U, H, F;
g.parameters = {
  ...g.parameters,
  docs: {
    ...((U = g.parameters) == null ? void 0 : U.docs),
    source: {
      originalSource: `{
  render: () => <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl">
      {Array.from({
      length: 8
    }, (_, i) => <Card key={i} title={\`Card \${i + 1}\`} clickable={true}>
          <p className="text-sm text-gray-600">
            This card demonstrates responsive grid behavior across different screen sizes.
          </p>
        </Card>)}
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Responsive grid layout showing how cards adapt to different screen sizes."
      }
    }
  }
}`,
      ...((F = (H = g.parameters) == null ? void 0 : H.docs) == null
        ? void 0
        : F.source),
    },
  },
};
const te = [
  "Default",
  "WithLongTitle",
  "NoTitle",
  "Clickable",
  "AsLink",
  "WithRichContent",
  "CaseStudyCard",
  "ServiceCard",
  "AllVariants",
  "ResponsiveGrid",
];
export {
  m as AllVariants,
  i as AsLink,
  d as CaseStudyCard,
  l as Clickable,
  s as Default,
  c as NoTitle,
  g as ResponsiveGrid,
  p as ServiceCard,
  n as WithLongTitle,
  o as WithRichContent,
  te as __namedExportsOrder,
  ee as default,
};
