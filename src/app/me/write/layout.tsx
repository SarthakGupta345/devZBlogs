import { Metadata } from "next"
import "../../globals.css"

export const metadata: Metadata = {
    title: "write Page about what you want to post",
    description: "A page where user can write their thoughts about what they want to post",
}

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body      >
                <div className=" w-full">

                    {children}

                </div>
            </body>
        </html>
    )
}

export default LayoutPage
