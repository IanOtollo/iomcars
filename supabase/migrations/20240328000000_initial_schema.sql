-- IOMCars Core Schema Migration

-- Extensions
create extension if not exists "uuid-ossp";

-- 1. Profiles (Internal Staff, Dealers, Agents)
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    full_name text,
    email text unique,
    phone text,
    avatar_url text,
    role text check (role in ('agent', 'dealer', 'admin')) default 'agent',
    kyc_verified boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Dealers
create table public.dealers (
    id uuid default uuid_generate_v4() primary key,
    profile_id uuid references public.profiles(id) on delete cascade,
    business_name text not null,
    slug text unique not null,
    logo_url text,
    location text,
    verified boolean default false,
    subscription_tier text check (subscription_tier in ('basic', 'pro', 'enterprise')) default 'basic',
    listing_limit integer default 10,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Agents
create table public.agents (
    id uuid default uuid_generate_v4() primary key,
    profile_id uuid references public.profiles(id) on delete cascade,
    specialization text[], -- e.g. ['cars', 'bikes']
    languages text[] default '{"English", "Swahili"}',
    rating decimal(3,2) default 5.0,
    total_deals integer default 0,
    bio text,
    availability_hours text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Vehicles
create table public.vehicles (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    title text not null,
    type text check (type in ('car', 'motorbike', 'truck', 'commercial')) not null,
    category text not null,
    status text check (status in ('available', 'reserved', 'sold', 'rented', 'maintenance')) default 'available',
    listing_type text check (listing_type in ('sale', 'rent', 'both')) default 'sale',
    
    make text not null,
    model text not null,
    year integer not null,
    variant text,
    color text,
    vin_chassis text,
    registration_plate text,
    
    mileage integer default 0,
    condition text check (condition in ('new', 'used', 'certified_pre_owned')) default 'used',
    
    price_kes bigint,
    rental_price_daily bigint,
    rental_price_weekly bigint,
    rental_price_monthly bigint,
    deposit_amount bigint,
    
    negotiable boolean default false,
    featured boolean default false,
    verified boolean default false,
    is_iom_stock boolean default false,
    
    description text,
    highlights jsonb default '[]'::jsonb,
    
    seller_id uuid references public.profiles(id), -- For private sellers (if allowed)
    dealer_id uuid references public.dealers(id),
    agent_id uuid references public.agents(id),
    
    views_count integer default 0,
    enquiries_count integer default 0,
    saves_count integer default 0,
    
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Vehicle Technical Specifications
create table public.vehicle_specs (
    vehicle_id uuid references public.vehicles(id) on delete cascade primary key,
    -- Engine
    engine_type text,
    engine_displacement_cc integer,
    cylinders integer,
    fuel_type text,
    fuel_tank_liters integer,
    -- Performance
    horsepower integer,
    torque_nm integer,
    top_speed_kmh integer,
    acceleration_0_100 decimal(4,2),
    -- Transmission
    transmission_type text,
    gears integer,
    drivetrain text,
    -- Dimensions
    length_mm integer,
    width_mm integer,
    height_mm integer,
    seats integer,
    cargo_volume_liters integer,
    -- Bike specific
    seat_height_mm integer,
    suspension_front text,
    suspension_rear text
);

-- 6. Media
create table public.vehicle_media (
    id uuid default uuid_generate_v4() primary key,
    vehicle_id uuid references public.vehicles(id) on delete cascade,
    url text not null,
    type text check (type in ('image', 'video', '360')) default 'image',
    angle text,
    is_primary boolean default false,
    sort_order integer default 0
);

-- RLS (Row Level Security)
alter table public.vehicles enable row level security;
alter table public.vehicle_specs enable row level security;
alter table public.vehicle_media enable row level security;
alter table public.dealers enable row level security;

-- Policies: Public Read
create policy "Public vehicles are viewable by everyone" on public.vehicles for select using (true);
create policy "Public specs are viewable by everyone" on public.vehicle_specs for select using (true);
create policy "Public media are viewable by everyone" on public.vehicle_media for select using (true);
create policy "Public dealers are viewable by everyone" on public.dealers for select using (true);

-- Indexes for performance
create index idx_vehicles_make_model on public.vehicles(make, model);
create index idx_vehicles_price on public.vehicles(price_kes);
create index idx_vehicles_type_category on public.vehicles(type, category);
create index idx_vehicles_is_iom_stock on public.vehicles(is_iom_stock) where is_iom_stock = true;
