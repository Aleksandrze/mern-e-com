import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import faker from "faker";

function Category({ category }) {
    const { categoryId } = useParams();
    const products = Array.from({ length: 15 }, (e) => {
        return {
            id: faker.random.uuid(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.random.float({ min: 500, max: 3000 }),
            images: [faker.image.imageUrl()],
        };
    });
    return (
        <div>
            <h4 className="mb-5">CategoryId: {categoryId}</h4>
            <div className="row">
                {products.map((e) => {
                    return (
                        <div key={e.id} className="col-3">
                            <div className="card mb-3">
                                <img className="card-img-top" src={e.images[0]} alt="Image" />
                                <div className="card-body">
                                    <h6>{e.title}</h6>
                                    <p>{e.description.substr(0, 50)}...</p>
                                    <div className="btn-group w-100" role="group">
                                        <button type="button" className="btn btn-primary">
                                            $ {e.price}
                                        </button>
                                        <button className="btn btn-outline-primary">
                                            <svg
                                                width="1em"
                                                height="1em"
                                                viewBox="0 0 16 16"
                                                className="bi bi-star"
                                                fill="currentColor"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

Category.propTypes = {
    category: PropTypes.object,
};

export default Category;
