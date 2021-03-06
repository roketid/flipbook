import Head from 'next/head'

export default function Home({ isConnected }) {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <Head>
        <title>Flipbook by roket.id, turn any PDF into Flipbook</title>
        <meta name="description" value="Flipbook can turn your pdf file into beautiful flipbook. Powered by roket.id" />
      </Head>
      <div className="container mx-auto bg-indigo-500 text-white rounded-lg p-6">
        <form action="/pdf" target="_blank">
          <h1 className="text-center font-bold  text-4xl pb-10">
            <a className="underline block py-6" href="/">flipbook.roket.id</a>
            Turn any PDF file into Flipbook</h1>
            <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
              <input name="source" className="text-base text-gray-400 flex-grow outline-none px-2 py-4 md:py-0" type="url" placeholder="Your PDF URL / Google Drive URL" />
              <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
                <button className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin">Go!</button>
              </div>
            </div>
            <div className="p-4">
              <span className="mr-2 inline-block">Example :</span>
              <a className="underline" target="_blank" href="/pdf?source=https://dearflip.com/wp-content/uploads/2019/07/dearpdf-manual.pdf">
              https://dearflip.com/wp-content/uploads/2019/07/dearpdf-manual.pdf
              </a>
            </div>
        </form>
      </div>
    </div>
  )
}

