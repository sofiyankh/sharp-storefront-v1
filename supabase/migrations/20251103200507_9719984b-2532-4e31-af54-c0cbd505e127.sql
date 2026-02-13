-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2),
  image_url TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cart_items table
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read)
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories FOR SELECT 
USING (true);

CREATE POLICY "Only admins can insert categories" 
ON public.categories FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update categories" 
ON public.categories FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete categories" 
ON public.categories FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for products (public read)
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT 
USING (true);

CREATE POLICY "Only admins can insert products" 
ON public.products FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update products" 
ON public.products FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete products" 
ON public.products FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for cart_items (users can only access their own cart)
CREATE POLICY "Users can view their own cart items" 
ON public.cart_items FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart items" 
ON public.cart_items FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items" 
ON public.cart_items FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items" 
ON public.cart_items FOR DELETE 
USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_cart_items_updated_at
BEFORE UPDATE ON public.cart_items
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_is_featured ON public.products(is_featured);
CREATE INDEX idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX idx_cart_items_product_id ON public.cart_items(product_id);