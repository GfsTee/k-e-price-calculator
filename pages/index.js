import Head from 'next/head'
import Calc from '../components/Calc'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Calc />

    </div>
  )
}
