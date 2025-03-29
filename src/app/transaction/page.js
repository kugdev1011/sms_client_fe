"use client";

import { Tab, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { useState } from "react";
import AllPaymentPanel from "./allPanel";
import CheckedPaymentPanel from "./checkedPanel";
import UnCheckedPaymentPanel from "./unCheckedPanel";
import Leftbar from "@/components/Header";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const displayOption = ["All", "Verified", "UnVerified"];
  return (
    <div>
      <Leftbar />
      <div className="content ml-64">
        <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md">
          <div className="w-full flex items-center justify-center mt-9">
            <div className="flex flex-col w-full items-center gap-6">
              <Tabs id="custom-animation" value={activeTab} className="w-full">
                <TabsHeader
                  className="w-96 h-auto rounded-none border-b border-blue-gray-50 bg-transparent p-0 mt-8"
                  indicatorProps={{
                    className:
                      "bg-transparent border-b-[2px] border-white shadow-none rounded-none",
                  }}
                >
                  {displayOption.map((data, index) => (
                    <Tab
                      key={index}
                      value={index}
                      onClick={() => setActiveTab(index)}
                      className={
                        activeTab === index
                          ? "text-white border-b-1 border-white font-bold"
                          : "text-[#AAA]"
                      }
                    >
                      {data}
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody
                  animate={{
                    initial: { x: 1000 },
                    mount: { x: 0 },
                    unmount: { x: -1000 },
                  }}
                >
                  <AllPaymentPanel />
                  <CheckedPaymentPanel />
                  <UnCheckedPaymentPanel />
                </TabsBody>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
