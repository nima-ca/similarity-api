import LargeHeading from "@/ui/LargeHeading";
import DocumentationTabs from "@src/components/DocumentationTabs";
import Paragraph from "@src/components/ui/Paragraph";
import { Metadata } from "next";
import { FunctionComponent } from "react";

export const metadata: Metadata = {
  title: "Similarity API | Documentation",
  description: "Free & open-source text similarity API",
};

const DocumentationPage: FunctionComponent = () => {
  return (
    <div className="container max-w-7xl mx-auto mt-12">
      <div className="flex flex-col items-center gap-6 ">
        <LargeHeading>Making a request</LargeHeading>
        <Paragraph>api/v1/similarity</Paragraph>

        <DocumentationTabs />
      </div>
    </div>
  );
};

export default DocumentationPage;
