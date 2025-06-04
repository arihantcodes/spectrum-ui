import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/Card";
import Image from "next/image";

export function SectionCards() {
  return (
    <div
      className="
    grid grid-cols-1 md:grid-cols-5 rounded-none
    "
    >
      <Card className="@container/card rounded-none ">
        <CardHeader className="relative">
          <Image src="/dashboard/users.svg" alt="" height={30} width={30} />

          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            202,123
          </CardTitle>
          <p className="text-sky-400 text-xs">
            +22,325 (12.2%){" "}
            <span className="text-gray-400">. Last 12 Months</span>
          </p>
        </CardHeader>
      </Card>
      <Card className="@container/card rounded-none">
        <CardHeader className="relative">
          <Image src="/dashboard/email.svg" alt="" height={30} width={30} />

          <CardDescription>Email open rate</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            78,500
          </CardTitle>
          <p className="text-sky-400 text-xs">
            +8,500 (12.1%){" "}
            <span className="text-gray-400">. Last 12 Months</span>
          </p>
        </CardHeader>
      </Card>
      <Card className="@container/card rounded-none">
        <CardHeader className="relative">
          <Image src="/dashboard/cursor.svg" alt="" height={30} width={30} />

          <CardDescription>Avg click rate</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            26.2%
          </CardTitle>
          <p className="text-red-600 text-xs">
            -2.3% (-8.1%){" "}
            <span className="text-gray-400">. Last 12 Months</span>
          </p>
        </CardHeader>
      </Card>

      <Card className="@container/card rounded-none">
        <CardHeader className="relative">
          <Image src="/dashboard/message.svg" alt="" height={30} width={30} />

          <CardDescription>Replied</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            23,212
          </CardTitle>
          <p className="text-red-600 text-xs">
            -2,123 (12.3%){" "}
            <span className="text-gray-400">. Last 12 Months</span>
          </p>
        </CardHeader>
      </Card>
      <Card className="@container/card rounded-none">
        <CardHeader className="relative">
          <Image
            src="/dashboard/user-minus.svg"
            alt=""
            height={30}
            width={30}
          />

          <CardDescription>Email open rate</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            14,000
          </CardTitle>
          <p className="text-sky-400 text-xs">
            +1,500 (12.3%){" "}
            <span className="text-gray-400">. Last 12 Months</span>
          </p>
        </CardHeader>
      </Card>
    </div>
  );
}
