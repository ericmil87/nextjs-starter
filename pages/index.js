import Head from 'next/head';
import Product from '../components/Product';
import prisma from '../lib/prisma';
import Hero from '../components/Hero';

export default function Home({ products ,  users }) {
  return (
    <div>
      <Head>
        <title>PlanetScale Next.js Quickstart</title>
        <meta name="description" content="PlanetScale Quickstart for Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero></Hero>
      <main className="p-10 mx-auto max-w-4xl">
        <h1 className="text-6xl font-bold mb-4 text-center">Next.js Starter</h1>
        <p className="mb-20 text-xl text-center">
          🔥 Shop from the hottest items in the world 🔥
        </p>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center  gap-4">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
        <div className="hr">User2</div>
        {console.log("USERS:")}
        {users.map((user) => (
            <div key={user.id}>user={user.name}</div> 
          ))}    

      </main>

      <footer></footer>
    </div>
  );
}

export async function getStaticProps(context) {
  const productData = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  //convert decimal value to string to pass through as json
  const products = productData.map((product) => ({
    ...product,
    price: product.price.toString(),
  }));
  //console.log(products);
  // USER DATA
  const userData = await prisma.user.findMany();
  
  
  const users = userData.map((user) => ({
    ...user,
    name: user.name.toString(),

  }));
  

  
  return {
    props: { users, products  },
  };
}
