-- Seed IOMCars Database

-- 1. Create a sample dealer (IOMCars)
INSERT INTO public.dealers (business_name, slug, location, verified, subscription_tier, listing_limit)
VALUES ('IOMCars Official', 'iomcars-official', 'Nairobi, Kenya', true, 'enterprise', 999);

-- 2. Create a sample agent
INSERT INTO public.agents (specialization, bio, availability_hours)
VALUES ('{"Luxury Sedans", "Sport Bikes"}', 'Expert in premium automotive solutions with 10+ years experience.', '08:00 - 18:00');

-- 3. Insert Vehicles
-- A. Luxury Sedan (IOM Verified)
INSERT INTO public.vehicles (
    slug, title, type, category, status, listing_type, 
    make, model, year, variant, color, mileage, condition, 
    price_kes, featured, verified, is_iom_stock, description, highlights, dealer_id
) VALUES (
    'mercedes-benz-s580-2024', '2024 Mercedes-Benz S580 4MATIC', 'car', 'sedan', 'available', 'sale',
    'Mercedes-Benz', 'S580', 2024, 'v8 Biturbo', 'Obsidian Black', 0, 'new',
    28500000, true, true, true, 
    'Experience the pinnacle of automotive luxury with the all-new S580. Features include Burmester 4D surround sound, executive rear seating, and MBUX hyperscreen.',
    '["Burmester 4D Sound", "Panoramic Sunroof", "Rear Massage Seats", "360 Camera"]'::jsonb,
    (SELECT id FROM public.dealers WHERE slug = 'iomcars-official' LIMIT 1)
);

-- B. Performance SUV
INSERT INTO public.vehicles (
    slug, title, type, category, status, listing_type, 
    make, model, year, variant, color, mileage, condition, 
    price_kes, featured, verified, is_iom_stock, description, dealer_id
) VALUES (
    'bmw-x7-m60i-2024', '2024 BMW X7 M60i', 'car', 'suv', 'available', 'sale',
    'BMW', 'X7', 2024, 'M60i', 'Frozen Grey', 500, 'certified_pre_owned',
    24000000, true, true, true, 
    'The ultimate luxury SAV. Unmatched performance and presence on the road.',
    (SELECT id FROM public.dealers WHERE slug = 'iomcars-official' LIMIT 1)
);

-- C. Sport Bike
INSERT INTO public.vehicles (
    slug, title, type, category, status, listing_type, 
    make, model, year, variant, color, mileage, condition, 
    price_kes, featured, verified, is_iom_stock, description, dealer_id
) VALUES (
    'ducati-panigale-v4s-2023', '2023 Ducati Panigale V4S', 'motorbike', 'sport_bike', 'available', 'sale',
    'Ducati', 'Panigale V4S', 2023, 'S-Version', 'Racing Red', 1200, 'used',
    4800000, false, true, false, 
    'The soul of Italian performance. Impeccable handling and raw power.',
    (SELECT id FROM public.dealers WHERE slug = 'iomcars-official' LIMIT 1)
);

-- D. Commercial Truck
INSERT INTO public.vehicles (
    slug, title, type, category, status, listing_type, 
    make, model, year, variant, color, mileage, condition, 
    price_kes, featured, verified, is_iom_stock, description, dealer_id
) VALUES (
    'isuzu-fvr-2022', '2022 Isuzu FVR Tipper', 'truck', 'lorry', 'available', 'sale',
    'Isuzu', 'FVR', 2022, 'Heavy Duty', 'White', 15000, 'used',
    7500000, false, false, false, 
    'Reliable workhorse for heavy industry. Fully serviced and ready for deployment.',
    (SELECT id FROM public.dealers WHERE slug = 'iomcars-official' LIMIT 1)
);

-- 4. Insert Specs for the S580
INSERT INTO public.vehicle_specs (
    vehicle_id, engine_type, engine_displacement_cc, cylinders, fuel_type, horsepower, torque_nm, transmission_type, drivetrain
) VALUES (
    (SELECT id FROM public.vehicles WHERE slug = 'mercedes-benz-s580-2024' LIMIT 1),
    'V8 biturbo with EQ Boost', 3982, 8, 'Petrol', 496, 700, '9G-TRONIC Automatic', 'AWD'
);
