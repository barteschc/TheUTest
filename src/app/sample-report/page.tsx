import { ReportView } from "@/components/ReportView";
import { traitsFor } from "@/lib/scoring";
import { getTest } from "@/lib/tests";

const SAMPLE_TEST_ID = "male";

export default function SampleReportPage() {
  const test = getTest(SAMPLE_TEST_ID)!;
  const traits = traitsFor(test, {});

  return <ReportView test={test} traits={traits} banner="Sample report · this is what $11.99 buys" />;
}
