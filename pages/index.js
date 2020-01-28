import axios from "axios";
import { useRouter } from "next/router";
import ProductList from "../components/Index/ProductList";
import { baseURL } from "../utils/baseUrl";
import { Fragment } from "react";
import ProductPagination from "../components/Index/ProductPagination";

function Home({ products, totalPages }) {
  const router = useRouter();
  const onPageChange = (e, data) => {
    data.activePage === 1
      ? router.push("/")
      : router.push(`/?page=${data.activePage}`);
  };
  return (
    <Fragment>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} onPageChange={onPageChange} />
    </Fragment>
  );
}

Home.getInitialProps = async function(ctx) {
  const page = ctx.query.page ? ctx.query.page : 1;
  const size = 9;
  const url = `${baseURL}/products`;
  const payload = { params: { page, size } };
  const response = await axios.get(url, payload);
  return response.data;
};

export default Home;
