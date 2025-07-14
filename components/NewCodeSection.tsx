import Image from "next/image";


export default function NewCodeSection(){

    return(
        <div className="h-[80%] w-full flex flex-col justify-start border border-[rgba(214,235,253,0.19)] rounded-2xl">

            {/* Title bar */}
            <div className="h-[8%] w-full flex justify-between items-center border-b border-[rgba(214,235,253,0.19)] p-3 ">
                <div className="h-full flex justify-center items-center gap-2 px-3">
                    <div className="rounded-full h-2 w-2 bg-[rgba(255,100,101,0.92)]"></div>
                    <div className="rounded-full h-2 w-2 bg-[rgba(255,214,10,1)]"></div>
                    <div className="rounded-full h-2 w-2 bg-[rgba(67,254,164,0.67)]"></div>
                </div>

                <div className="flex justify-center items-center border border-[rgba(214,235,253,0.19)] rounded-lg ">
                    <div className="flex justify-center items-center h-8 w-8 bg-zinc-950">
                        <img src="/codeAssets/desktop.png" alt="Desktop" className="h-6" />
                    </div>
                    <div className="flex justify-center items-center h-8 w-8 ">
                        <img src="/codeAssets/mobile.png" alt="Mobile" className="h-6" />
                    </div>

                </div>
            </div>

            <div className="h-[92%] w-full grid grid-cols-[1fr_3fr_3fr]">

                {/* Aside */}
                <div className="h-full w-full flex flex-col justify-start gap-1 border-r border-[rgba(214,235,253,0.19)] overflow-hidden">
                    <div className="h-[5%] w-full flex justify-start items-center gap-1 bg-zinc-950 px-[8px] py-[2px] rounded-l-lg">
                        <img src="/codeAssets/arrow.png" alt="Down Arrow" className="h-4" />
                        <img src="/codeAssets/folder.png" alt="Folder" className="h-3" />
                        <p className="text-sm font-inter font-normal">Spectrum UI</p>
                    </div>

                    <div className="h-[5%] w-full flex justify-start items-center gap-1 bg-zinc-950 px-[8px] py-[2px] ml-6 rounded-l-lg">
                        <img src="/codeAssets/arrow.png" alt="Down Arrow" className="h-4" />
                        <img src="/codeAssets/folder.png" alt="Folder" className="h-3" />
                        <p className="text-sm font-inter font-normal">App</p>
                    </div>

                    <div className="h-[5%] w-full flex justify-start items-center gap-1 bg-zinc-950 px-[8px] py-[2px] ml-12 rounded-l-lg">
                        <img src="/codeAssets/arrow.png" alt="Down Arrow" className="h-4" />
                        <img src="/codeAssets/folder.png" alt="Folder" className="h-3" />
                        <p className="text-sm font-inter font-normal">Profile</p>
                    </div>

                    <div className="h-[5%] w-[60%] flex justify-center items-center gap-1 bg-zinc-900 px-[8px] py-[2px] ml-16 mr-3 rounded-l-lg rounded-r-lg">
                        <p className="text-sm font-inter font-normal">Page.tsx</p>
                    </div>
                </div>


                {/* Code Tabpanel */}
                <div className="h-full w-full flex flex-col justify-start bg-[rgba(5,5,10,1)] pl-6 pt-3 overflow-hidden">
                    <pre className="bg-[rgba(5,5,10,1)] text-sm/6 font-mono overflow-hidden">
                        <code>{`1  import { Body, Button, Column, Container, Head, Heading, Hr, Html
2  import * as React from 'react';
3
4  const WelcomeEmail = ({
5    username = 'newuser',
6    company = 'ACME',
7    } : WelcomeEmailProps) => {
8    const previewText = \`Welcome to \${company}, \${username}!\`;
9
10   return (
11     <Html />
12     <Head />
13     <Preview>{previewText}</Preview>
14     <Tailwind>
15       <Body className="bg-white my-10 mx-auto font-sans">
16         <Container className="my-10 mx-auto p-5 w-[465px]">
17           <Section className="mt-8">
18             <Img
19               src="\${baseUrl}/static/example-logo.png"
20               width="80"
21               height="80"
22               alt="Logo Example"
23               className="my-0 mx-auto"
24             />
25           </Section>
26           <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0
27           Welcome to <strong>{company}</strong>, {username}!
                        `}</code>
                        </pre>
                </div>

                {/* Spectrum ui component's screenshot */}
                <div className="h-full w-full flex justify-center items-center overflow-hidden">
                        <img src="/codeAssets/codeCardSS.png" alt="Spectrum Card" className="h-[80%] w-auto max-h-full max-w-full object-contain" />
                </div>

            </div>
        </div>
    )
}