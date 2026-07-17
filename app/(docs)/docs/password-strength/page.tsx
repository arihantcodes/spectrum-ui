import React from "react"
import {
  PageSectionTitle,
  PageSubTitle,
  PageTemplate,
} from "../components/page-template"
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card"
import CodeHighlight from "@/app/(docs)/docs/components/code-card/parts/code-highlight"
import { PropsTable } from "@/app/(docs)/docs/components/props-table/props-table"
import { InlineCode } from "@/components/ui/inline-code"
import { Metadata } from "next"
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata"
import { SEOWrapper } from "@/app/(docs)/docs/components/seo-wrapper"

import PasswordStrengthDemo from "./password-strength-demo"
import PasswordStrengthCustomDemo from "./password-strength-custom-demo"

export const metadata: Metadata = baseMetadata({
  title: "Password Strength",
  description:
    "A password input with an animated strength meter and requirements checklist. A free React and Next.js component built with Framer Motion and Tailwind CSS.",
  keywords: [
    "password strength component",
    "React password input",
    "password strength meter",
    "password requirements checklist",
    "animated strength meter",
    "password visibility toggle",
    "framer motion input",
    "Next.js password input",
  ],
  canonicalUrl: "https://ui.spectrumhq.in/docs/password-strength",
})

const page = () => {
  const description =
    "A password input with an animated strength meter and requirements checklist."

  return (
    <SEOWrapper
      componentName="Password Strength"
      description={description}
      url="https://ui.spectrumhq.in/docs/password-strength"
      keywords={[
        "password strength component",
        "password strength meter",
        "password requirements checklist",
        "password visibility toggle",
      ]}
    >
      <PageTemplate title="Password Strength" description={description}>
        {/* Preview + Installation (CLI | Manual) */}
        <PreviewCodeCard
          path="app/(docs)/docs/password-strength/password-strength-demo.tsx"
          installCodePath="components/spectrumui/password-strength.tsx"
          cli="@spectrumui/password-strength"
          installScript="npm i framer-motion lucide-react"
        >
          <PasswordStrengthDemo />
        </PreviewCodeCard>

        {/* Usage */}
        <PageSubTitle>Usage</PageSubTitle>
        <div className="flex flex-col gap-6">
          <CodeHighlight
            code={`import { PasswordStrengthInput } from "@/components/spectrumui/password-strength"`}
            requireAuth={false}
          />
          <CodeHighlight
            code={`<PasswordStrengthInput onValueChange={(value) => console.log(value)} />`}
            requireAuth={false}
          />
        </div>

        {/* API Reference */}
        <PageSubTitle>API Reference</PageSubTitle>
        <PageSectionTitle className="mt-0">
          PasswordStrengthInput
        </PageSectionTitle>
        <p className="mt-3 text-base leading-[26px] text-[#686868] dark:text-neutral-400">
          Renders a password <InlineCode>input</InlineCode> with a visibility
          toggle, a strength meter announced via a polite live region, and a
          requirements checklist. Pass <InlineCode>value</InlineCode> to control
          it from outside, or <InlineCode>defaultValue</InlineCode> to let it
          manage its own state. Strength is scored against{" "}
          <InlineCode>rules</InlineCode>, an array of{" "}
          <InlineCode>PasswordRule</InlineCode> objects of the shape{" "}
          <InlineCode>{`{ label: string; test: (value: string) => boolean }`}</InlineCode>
          . The exported <InlineCode>DEFAULT_RULES</InlineCode> check for at
          least 8 characters, one uppercase letter, one number and one symbol.
        </p>
        <div className="mt-4">
          <PropsTable
            withTitle={false}
            props={[
              {
                prop: "value",
                required: false,
                type: "string",
                description:
                  "Controlled value. Leave undefined for uncontrolled usage",
              },
              {
                prop: "defaultValue",
                required: false,
                type: "string",
                default: `""`,
                description: "Initial value when uncontrolled",
              },
              {
                prop: "onValueChange",
                required: false,
                type: "(value: string) => void",
                description: "Fires with the next value on every keystroke",
              },
              {
                prop: "rules",
                required: false,
                type: "PasswordRule[]",
                default: "DEFAULT_RULES",
                description:
                  "Rules scored by the meter and listed in the checklist",
              },
              {
                prop: "showChecklist",
                required: false,
                type: "boolean",
                default: "true",
                description: "Render the requirements checklist",
              },
              {
                prop: "showMeter",
                required: false,
                type: "boolean",
                default: "true",
                description: "Render the strength meter and label",
              },
              {
                prop: "placeholder",
                required: false,
                type: "string",
                default: `"Enter password"`,
                description: "Placeholder of the input",
              },
              {
                prop: "id",
                required: false,
                type: "string",
                description: "Id of the input element",
              },
              {
                prop: "name",
                required: false,
                type: "string",
                description: "Name of the input element",
              },
              {
                prop: "autoComplete",
                required: false,
                type: "string",
                default: `"new-password"`,
                description: "Autocomplete hint of the input",
              },
              {
                prop: "disabled",
                required: false,
                type: "boolean",
                default: "false",
                description: "Disables the input and the visibility toggle",
              },
              {
                prop: "onFocus",
                required: false,
                type: "React.FocusEventHandler<HTMLInputElement>",
                description: "Forwarded to the input element",
              },
              {
                prop: "onBlur",
                required: false,
                type: "React.FocusEventHandler<HTMLInputElement>",
                description: "Forwarded to the input element",
              },
              {
                prop: "className",
                required: false,
                type: "string",
                description:
                  "Additional classes merged onto the wrapper element",
              },
            ]}
          />
        </div>

        {/* Examples */}
        <PageSubTitle>Examples</PageSubTitle>
        <PageSectionTitle className="mt-0">
          Custom rules and meter only
        </PageSectionTitle>
        <PreviewCodeCard
          path="app/(docs)/docs/password-strength/password-strength-custom-demo.tsx"
          withInstallation={false}
          className="mt-4"
        >
          <PasswordStrengthCustomDemo />
        </PreviewCodeCard>
      </PageTemplate>
    </SEOWrapper>
  )
}

export default page
