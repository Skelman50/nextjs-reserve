import { Container, Pagination } from "semantic-ui-react";

function ProductPagination({ totalPages, onPageChange }) {
  return (
    <Container textAlign="center" style={{ margin: "2em" }}>
      <Pagination
        defaultActivePage={1}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Container>
  );
}

export default ProductPagination;
