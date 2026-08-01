import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResponsiveInputShowcase from "./spectrumui/form";

export function Tabspreview() {
  return (
    <Tabs defaultValue="preview" className="my-8">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="p-4 bg-card rounded-lg shadow-sm">
        <ResponsiveInputShowcase />
      </TabsContent>
      <TabsContent
        value="code"
        className="p-4 bg-muted rounded-lg"
      ></TabsContent>
    </Tabs>
  );
}
