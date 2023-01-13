import type { Plugin } from "vite";
import { docNames, getDocs } from "../../../types";
import { replacer } from "../../../scripts/utils";

export function MarkdownTransform(): Plugin {
  return {
    name: "chodocs-md-transform",
    enforce: "pre",
    async transform(code, id) {
      if (!id.match(/\.md\b/)) return null;
      // linkify function names
      code = code.replace(
        new RegExp(`\`({${docNames.join("|")}})\`(.)`, "g"),
        (_, name, ending) => {
          if (ending === "]")
            // already a link
            return _;
          const fn = getDocs(name)!;
          return `[\`${fn.name}\`](${fn.docs}) `;
        }
      );
      // convert links to relative
      code = code.replace(/https?:\/\/vueuse\.org\//g, "/");

      const [pkg, _name, i] = id.split("/").slice(-3);

      const name =
        docNames.find((n) => n.toLowerCase() === _name.toLowerCase()) || _name;

      if (docNames.includes(name) && i === "index.md") {
        const { footer } = await getDocsMarkdown(pkg, name);
        code = replacer(code, footer, "FOOTER", "tail");
      }

      return code;
    },
  };
}

export async function getDocsMarkdown(pkg: string, name: string) {
  const ContributorsSection = `## Contributors
  <Contributors doc="${name}" />`;

  const footer = `${ContributorsSection}\n`;

  return {
    footer,
  };
}
