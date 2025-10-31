import {
  PageSubTitle,
  PageTemplate,
} from "@/app/(docs)/docs/components/page-template";
import PreviewCodeCard from "@/app/(docs)/docs/components/preview-code-card";
import { Steppers } from "@/components/ui/steppers";
import { Metadata } from "next";
import { baseMetadata } from "@/app/(docs)/layout-parts/base-metadata";
import Usage from "@/app/(docs)/docs/components/usage";
import { P } from "@/components/ui/heading-with-anchor";
import { InlineCode } from "@/components/ui/inline-code";
import { PropLink } from "@/app/(docs)/docs/components/props-table/prop-link";
import MultipleSelectorDemo from "@/app/(docs)/docs/multiple-selector/multiple-selector-demo";
import MultipleSelectorControlled from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-controlled";
import MultipleSelectorWithDisabledOption from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-with-disable-option";
import MultipleSelectorWithAsyncSearch from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-with-async-search";
import MultipleSelectorWithMaxSelected from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-max-selected";
import { PropsTable } from "@/app/(docs)/docs/components/props-table/props-table";
import { multipleSelectorProp } from "@/app/(docs)/docs/multiple-selector/multiple-selector-prop";
import MultipleSelectorNoPlaceholderWhenSelected from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-no-placeholder-when-selected";
import MultipleSelectorWithForm from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-with-form";
import MultipleSelectorDisabled from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-disabled";
import MultipleSelectorWithGroup from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-with-group";
import MultipleSelectorNoDefaultSelect from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-no-default-select";
import MultipleSelectorWithFixedOption from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-fixed-option";
import MultipleSelectorCreatable from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-creatable";
import MultipleSelectorWithAsyncSearchAndCreatable from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-with-async-search-and-creatable";
import MultipleSelectorWithAsyncSearchAndCreatableAndGroup from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-with-async-search-and-creatable-and-group";
import MultipleSelectorMaxTextLength from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-max-text-length";
import MultipleSelectorRef from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-ref";
import MultipleSelectorCommandProps from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-commandprops";
import MultipleSelectorWithAsyncSearchAndOnFocus from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-with-async-search-and-onfocus";
import MultipleSelectorManuallyControlledOptions from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-manually-controlled-options";
import MultipleSelectorHideClearAll from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-hide-clear-all";
import MultipleSelectorWithSyncSearch from "@/app/(docs)/docs/multiple-selector/usage/multiple-selector-with-sync-search";

export const metadata: Metadata = baseMetadata({
  title: "Spectrum UI-Multiple Selector",
  description:
    "Fast,composable, fully-featured multiple selector for React. such as async search with debounce, maximum selected count, grouping, creatable selector ...etc.",
});

const MultipleSelectorPage = () => {
  return (
    <PageTemplate
      title="Multiple Selector"
      description="Fast, composable, fully-featured multiple selector for React."
    >
      <PreviewCodeCard
        path="app/(docs)/docs/multiple-selector/multiple-selector-demo.tsx"
        cli="@spectrumui/multiple-selector-demo"
      >
        <MultipleSelectorDemo />
      </PreviewCodeCard>

      <PageSubTitle>Installation</PageSubTitle>
      <Steppers
        withInstall
        codePath="components/ui/multiple-selector.tsx"
        installScript="npx shadcn@latest add command badge"
        steps={[
          {
            title:
              "If you found that you can't select options using mouse click.",
            children: (
              <>
                <P className="leading-relaxed text-muted-foreground">
                  Thanks to{" "}
                  <PropLink href="https://github.com/njdowdy">
                    @njdowdy
                  </PropLink>{" "}
                  for the{" "}
                  <PropLink href="https://github.com/hsuanyi-chou/shadcn-ui-expansions/issues/57#issuecomment-1997767639">
                    short-term workaround
                  </PropLink>
                  . This is related to <InlineCode>Command</InlineCode>{" "}
                  component in shadcn-ui.
                </P>
                <P className="leading-relaxed text-muted-foreground">
                  Adjusting the line 120 in shadcn&apos;s{" "}
                  <InlineCode>Command.tsx</InlineCode> (which is{" "}
                  <InlineCode>CommandItem&apos;s className</InlineCode>) to:
                </P>
                <P className="leading-relaxed text-muted-foreground">
                  <InlineCode>
                    &quot;relative flex cursor-default select-none items-center
                    rounded-sm px-2 py-1.5 text-sm outline-none
                    aria-[selected=&apos;true&apos;]:bg-accent
                    aria-[selected=&apos;true&apos;]:text-accent-foreground
                    data-[disabled=&apos;true&apos;]:pointer-events-none
                    data-[disabled=&apos;true&apos;]:opacity-50&quot;,
                  </InlineCode>
                </P>
              </>
            ),
          },
        ]}
        withEnd
      />

      <PageSubTitle>Usage</PageSubTitle>
      <Usage
        title="Disable Option"
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-with-disable-option.tsx"
        cli="@spectrumui/multiple-selector-with-disable-option"
      >
        <MultipleSelectorWithDisabledOption />
      </Usage>
      <Usage
        title="Disabled"
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-disabled.tsx"
        cli="@spectrumui/multiple-selector-disabled"
      >
        <MultipleSelectorDisabled />
      </Usage>
      <Usage
        title="Disable First Item selected"
        cli="@spectrumui/multiple-selector-no-default-select"
        description={
          <>
            <P className="text-muted-foreground">
              The first item selected is a default behavior by{" "}
              <PropLink href="https://github.com/pacocoursey/cmdk">
                <InlineCode>cmdk</InlineCode>
              </PropLink>{" "}
              and there is no way to control it. You can learn more about the{" "}
              <PropLink href="https://github.com/pacocoursey/cmdk/issues/171">
                <InlineCode>issue</InlineCode>
              </PropLink>
              .
            </P>
            <P className="text-muted-foreground">
              Here is a workaround solution: by adding a dummy item.
            </P>
          </>
        }
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-no-default-select.tsx"
      >
        <MultipleSelectorNoDefaultSelect />
      </Usage>
      <Usage
        title="Controlled Component"
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-controlled.tsx"
        cli="@spectrumui/multiple-selector-controlled"
      >
        <MultipleSelectorControlled />
      </Usage>
      <Usage
        title="Hide Clear All Button"
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-hide-clear-all.tsx"
        cli="@spectrumui/multiple-selector-hide-clear-all"
      >
        <MultipleSelectorHideClearAll />
      </Usage>
      <Usage
        title="Creatable Selector"
        description={
          <P className="text-muted-foreground">
            Create option when there is no option matched.
          </P>
        }
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-creatable.tsx"
        cli="@spectrumui/multiple-selector-creatable"
      >
        <MultipleSelectorCreatable />
      </Usage>
      <Usage
        title="Async Search with Debounce"
        description={
          <>
            <P className="text-muted-foreground">
              The async search is debounced by default. The delay time is 500ms
              if you do not provide it.
            </P>
            <P className="text-muted-foreground">
              You can provide <InlineCode>delay</InlineCode> to customize the
              time. The <InlineCode>delay</InlineCode> prop only works with{" "}
              <InlineCode>onSearch</InlineCode>.
            </P>
            <P className="text-muted-foreground">
              The empty text <b>will not</b> trigger the search. On the other
              hand, if the search had been triggered, and user delete all the
              texts, it will not trigger the search again and keep the current
              options with empty text.
            </P>
          </>
        }
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-with-async-search.tsx"
        cli="@spectrumui/multiple-selector-with-async-search"
      >
        <MultipleSelectorWithAsyncSearch />
      </Usage>
      <Usage
        title="Trigger Search on Focus"
        description={
          <>
            <P className="text-muted-foreground">
              Only works with <InlineCode>onSearch</InlineCode> prop. Trigger
              search when <InlineCode>onFocus</InlineCode>.
            </P>
            <P className="text-muted-foreground">
              For example, when user click on the input, it will trigger the
              search to get initial options.
            </P>
            <P className="text-muted-foreground">
              The empty text <b>will</b> trigger the search.
            </P>
          </>
        }
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-with-async-search-and-onfocus.tsx"
        cli="@spectrumui/multiple-selector-with-async-search-and-onfocus"
      >
        <MultipleSelectorWithAsyncSearchAndOnFocus />
      </Usage>
      <Usage
        title="Async Search with Debounce and Creatable"
        description={
          <>
            <P className="text-muted-foreground">
              If you combine the async search and creatable, you can create
              option when there is no option matched.
            </P>
          </>
        }
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-with-async-search-and-creatable.tsx"
        cli="@spectrumui/multiple-selector-with-async-search-and-creatable"
      >
        <MultipleSelectorWithAsyncSearchAndCreatable />
      </Usage>
      <Usage
        title="Async Search and Creatable and Group"
        description={
          <>
            <P className="text-muted-foreground">
              If you combine the async search and creatable and group, you can
              still create option when there is no option matched.
            </P>
          </>
        }
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-with-async-search-and-creatable-and-group.tsx"
        cli="@spectrumui/multiple-selector-with-async-search-and-creatable-and-group"
      >
        <MultipleSelectorWithAsyncSearchAndCreatableAndGroup />
      </Usage>

      <Usage
        title="Sync Search without loading indicator"
        description={
          <>
            <P className="text-muted-foreground">
              Sync search is for search locally without any request to the
              server. This will not show loading indicator even if you provide
              it. The rest props are the same as async search. i.e.:{" "}
              <InlineCode>creatable</InlineCode>,{" "}
              <InlineCode>groupBy</InlineCode>, <InlineCode>delay</InlineCode>.
            </P>
          </>
        }
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-with-sync-search.tsx"
        cli="@spectrumui/multiple-selector-with-sync-search"
      >
        <MultipleSelectorWithSyncSearch />
      </Usage>

      <Usage
        title="Manually Controlled Options"
        description={
          <>
            <P className="text-muted-foreground">
              If you want to controlled options yourself, you can provide{" "}
              <InlineCode>options</InlineCode> prop.
            </P>
            <P className="text-muted-foreground">
              Otherwise, <InlineCode>defaultOptions</InlineCode> is a better
              choice.
            </P>
          </>
        }
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-manually-controlled-options.tsx"
        cli="@spectrumui/multiple-selector-manually-controlled-options"
      >
        <MultipleSelectorManuallyControlledOptions />
      </Usage>
      <Usage
        title="Grouped"
        description={
          <>
            <P className="text-muted-foreground">
              Grouping options by specific key of{" "}
              <InlineCode>object</InlineCode>
            </P>
          </>
        }
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-with-group.tsx"
        cli="@spectrumui/multiple-selector-with-group"
      >
        <MultipleSelectorWithGroup />
      </Usage>
      <Usage
        title="Maximum Selected Count"
        description={
          <P className="text-muted-foreground">
            Following example is set to 3. The default of max selected is{" "}
            <InlineCode>Number.MAX_SAFE_INTEGER</InlineCode>
          </P>
        }
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-max-selected.tsx"
        cli="@spectrumui/multiple-selector-max-selected"
      >
        <MultipleSelectorWithMaxSelected />
      </Usage>
      <Usage
        title="Maximum Text Length"
        description={
          <P className="text-muted-foreground">
            Following example is set to 5.
          </P>
        }
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-max-text-length.tsx"
        cli="@spectrumui/multiple-selector-max-text-length"
      >
        <MultipleSelectorMaxTextLength />
      </Usage>
      <Usage
        title="Hide Placeholder When Selected"
        description={
          <>
            <P className="text-muted-foreground">
              If you would like to work as a normal input that hide the
              placeholder when there are options selected.
            </P>
            <P className="text-muted-foreground">
              Just set <InlineCode>hidePlaceholderWhenSelected</InlineCode> to{" "}
              <InlineCode>true</InlineCode>
            </P>
          </>
        }
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-no-placeholder-when-selected.tsx"
        cli="@spectrumui/multiple-selector-no-placeholder-when-selected"
      >
        <MultipleSelectorNoPlaceholderWhenSelected />
      </Usage>
      <Usage
        title="Fixed Options"
        description={
          <P className="text-muted-foreground">
            Provide <InlineCode>fixed: true</InlineCode> in your{" "}
            <InlineCode>value</InlineCode>
          </P>
        }
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-fixed-option.tsx"
        cli="@spectrumui/multiple-selector-fixed-option"
      >
        <MultipleSelectorWithFixedOption />
      </Usage>
      <Usage
        title="ref"
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-ref.tsx"
        cli="@spectrumui/multiple-selector-ref"
      >
        <MultipleSelectorRef />
      </Usage>
      <Usage
        title="CommandProps and CommandInputProps Customization"
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-commandprops.tsx"
        cli="@spectrumui/multiple-selector-commandprops"
      >
        <MultipleSelectorCommandProps />
      </Usage>
      <Usage
        title="Form"
        path="app/(docs)/docs//multiple-selector/usage/multiple-selector-with-form.tsx"
        cli="@spectrumui/multiple-selector-with-form"
      >
        <MultipleSelectorWithForm />
      </Usage>

      <PropsTable props={multipleSelectorProp} />
    </PageTemplate>
  );
};

export default MultipleSelectorPage;
