import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import ResponsiveInputShowcase from "./SpectrumUI/Form";

export function Tabspreview() {
  const codeString = `
    import { Button } from "@/components/ui/button";
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import {
      Tabs,
      TabsContent,
      TabsList,
      TabsTrigger,
    } from "@/components/ui/tabs";
    import ResponsiveInputShowcase from "./spectrumui/form";

    export function Tabspreview() {
      return (
        <Tabs defaultValue="preview" className="my-8">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="p-4 bg-card rounded-lg shadow">
            <ResponsiveInputShowcase />
          </TabsContent>
          <TabsContent value="code" className="p-4 bg-muted rounded-lg">
            <pre><code>{\`
              <h1>Hello</h1>
            \`}</code></pre>
          </TabsContent>
        </Tabs>
      );
    }
  `;

  return (
    <Tabs defaultValue="preview" className="my-8">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="p-4 bg-card rounded-lg shadow">
        <ResponsiveInputShowcase />
      </TabsContent>
      <TabsContent
        value="code"
        className="p-4 bg-muted rounded-lg"
      ></TabsContent>
    </Tabs>
  );
}
