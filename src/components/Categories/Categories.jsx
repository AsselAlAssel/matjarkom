import React, { useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import CategoryPlaceHolder from "../CategoryPlaceHolder/CategoryPlaceHolder";

const Categories = ({ openCategoryForm, setSelectedCategory }) => {
  const [categories, setCategories] = useState([1, 2, 3, 4]);
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-10 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category}
              setSelectedCategory={setSelectedCategory}
              openCategoryForm={openCategoryForm}
            />
          ))}
          <CategoryPlaceHolder onClickOnAddCategory={openCategoryForm} />
        </div>
      </div>
    </div>
  );
};

export default Categories;
