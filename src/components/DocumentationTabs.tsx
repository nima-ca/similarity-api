"use client";

import { FunctionComponent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/Tabs";
import { SupportedLanguages } from "@src/lib/enum";
import Code from "@/components/Code";
import { nodejs, python } from "@src/helpers/DocumentationsCodes";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const DocumentationTabs: FunctionComponent = () => {
  return (
    <Tabs
      defaultValue={SupportedLanguages.NODEJS}
      className="max-w-2xl w-full mb-10"
    >
      <TabsList>
        <TabsTrigger value={SupportedLanguages.NODEJS}>NodeJs</TabsTrigger>
        <TabsTrigger value={SupportedLanguages.PYTHON}>Python</TabsTrigger>
      </TabsList>
      <TabsContent value={SupportedLanguages.NODEJS}>
        <SimpleBar>
          <Code code={nodejs} language="javascript" show animated />
        </SimpleBar>
      </TabsContent>
      <TabsContent value={SupportedLanguages.PYTHON}>
        <SimpleBar>
          <Code code={python} language="python" show animated />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;
