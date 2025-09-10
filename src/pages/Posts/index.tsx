import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useRef, useCallback } from 'react';

const PAGE_SIZE = 9;

const Posts = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchRecipes = useCallback(async (pageNum: number) => {
    setLoading(true);
    const res = await fetch(`https://dummyjson.com/recipes?limit=${PAGE_SIZE}&skip=${(pageNum - 1) * PAGE_SIZE}`);
    const json = await res.json();
    if (json.recipes && json.recipes.length > 0) {
      setRecipes((prev) => [...prev, ...json.recipes]);
      setHasMore(json.recipes.length === PAGE_SIZE);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRecipes(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!hasMore || loading) return;
    const observer = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loading]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {recipes.map((recipe) => (
        <Card key={recipe.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{recipe.title}</CardTitle>
            <CardDescription>
              {recipe.brand} &mdash; {recipe.category}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <div className="mb-2 text-sm text-muted-foreground">{recipe.description}</div>
            <div className="flex flex-wrap gap-2 text-xs mb-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{recipe.availabilityStatus}</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">SKU: {recipe.sku}</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Stock: {recipe.stock}</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                Min Order: {recipe.minimumOrderQuantity}
              </span>
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <span>
                Dimensions: {recipe.dimensions?.width} x {recipe.dimensions?.height} x {recipe.dimensions?.depth} cm
              </span>
              <span>Weight: {recipe.weight}g</span>
              <span>Tags: {recipe.tags?.join(', ')}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <div className="font-bold text-lg">
              ${recipe.price}{' '}
              <span className="text-xs font-normal text-red-500">({recipe.discountPercentage}% off)</span>
            </div>
            <div className="flex gap-2 text-xs">
              <span>Rating: {recipe.rating}</span>
              <span>Reviews: {recipe.reviews?.length}</span>
            </div>
            <div className="text-xs">Shipping: {recipe.shippingInformation}</div>
            <div className="text-xs">Warranty: {recipe.warrantyInformation}</div>
            <div className="text-xs">Return: {recipe.returnPolicy}</div>
            <div className="flex gap-2 mt-2">
              <img src={recipe.meta?.qrCode} alt="QR Code" className="w-8 h-8" />
              <span className="text-xs">Barcode: {recipe.meta?.barcode}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
      {hasMore && (
        <div ref={loaderRef} className="col-span-full flex justify-center py-8">
          {loading ? <span>Loading...</span> : <span>Scroll to load more...</span>}
        </div>
      )}
    </div>
  );
};

export default Posts;
