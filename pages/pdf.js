import Head from 'next/head'
import clientPromise from '../lib/mongodb'

export default function Home({ pdf }) {
  return (
    <div id="flipbook">
      <Head>
        <link href="/dflip/css/dflip.min.css" rel="stylesheet" type="text/css" />
        <link href="/dflip/css/themify-icons.min.css" rel="stylesheet" type="text/css" />
        <script src="/dflip/js/libs/jquery.min.js" type="text/javascript"></script>
        <script src="/dflip/js/dflip.min.js" type="text/javascript"></script>
      </Head>
      <div className="_df_book" webgl="true" backgroundcolor="teal" source={pdf}></div>
    </div>
  )
}

const getDriveDownloaderLink = url => {
  return url.replace(/\/file\/d\/(.+)\/(.+)/, "/uc?export=download&id=$1")
}

export async function getServerSideProps({ query, res }) {
  const client = await clientPromise

  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands

  // const isConnected = await client.isConnected()
  let pdf = null

  let url = query.source

  if (url) {
    url = url.trim()
    if (url.indexOf('drive.google.com') !== -1) {
      url = getDriveDownloaderLink(url)
    }
    pdf = 'https://rapid-field-1713.mrofi.workers.dev/corsproxy/?apiurl=' + encodeURIComponent(url)
    const db = await client.db(process.env.MONGODB_DATABASE)
    const collection = await db.collection(process.env.MONGODB_COLLECTION)
  
    collection.update({url}, {$inc: {count: 1}}, {upsert: true})
  
    return {
      props: { pdf },
    }
  }


  res.writeHead(307, {Location: '/'})
  res.end()

  return {}
}
