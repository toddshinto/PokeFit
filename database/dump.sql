--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.users DROP CONSTRAINT users_pk;
ALTER TABLE ONLY public.pokeboxes DROP CONSTRAINT pokeboxes_pk;
ALTER TABLE ONLY public.items DROP CONSTRAINT items_pk;
ALTER TABLE ONLY public."backpackItems" DROP CONSTRAINT "backpackItems_pk";
ALTER TABLE public.users ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.pokeboxes ALTER COLUMN "pokeboxId" DROP DEFAULT;
ALTER TABLE public.items ALTER COLUMN "itemId" DROP DEFAULT;
ALTER TABLE public."backpackItems" ALTER COLUMN "backpackId" DROP DEFAULT;
DROP SEQUENCE public."users_userId_seq";
DROP TABLE public.users;
DROP SEQUENCE public."pokeboxes_pokeboxId_seq";
DROP TABLE public.pokeboxes;
DROP SEQUENCE public."items_itemId_seq";
DROP TABLE public.items;
DROP SEQUENCE public."backpackItems_backpackId_seq";
DROP TABLE public."backpackItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: backpackItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."backpackItems" (
    "backpackId" integer NOT NULL,
    "userId" integer NOT NULL,
    "itemId" integer NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: backpackItems_backpackId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."backpackItems_backpackId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: backpackItems_backpackId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."backpackItems_backpackId_seq" OWNED BY public."backpackItems"."backpackId";


--
-- Name: items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.items (
    "itemId" integer NOT NULL,
    name character varying(20) NOT NULL,
    "itemType" character varying(20) NOT NULL,
    "itemDescription" text NOT NULL,
    effect character varying(255) NOT NULL,
    sprite character varying(255) NOT NULL
);


--
-- Name: items_itemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."items_itemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: items_itemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."items_itemId_seq" OWNED BY public.items."itemId";


--
-- Name: pokeboxes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pokeboxes (
    "pokeboxId" integer NOT NULL,
    "userId" character varying(16) NOT NULL,
    "pokemonId" integer NOT NULL,
    name character varying(16) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: pokeboxes_pokeboxId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."pokeboxes_pokeboxId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pokeboxes_pokeboxId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."pokeboxes_pokeboxId_seq" OWNED BY public.pokeboxes."pokeboxId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    "milesWalked" integer NOT NULL,
    encounters integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: backpackItems backpackId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."backpackItems" ALTER COLUMN "backpackId" SET DEFAULT nextval('public."backpackItems_backpackId_seq"'::regclass);


--
-- Name: items itemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items ALTER COLUMN "itemId" SET DEFAULT nextval('public."items_itemId_seq"'::regclass);


--
-- Name: pokeboxes pokeboxId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pokeboxes ALTER COLUMN "pokeboxId" SET DEFAULT nextval('public."pokeboxes_pokeboxId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: backpackItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."backpackItems" ("backpackId", "userId", "itemId", quantity, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.items ("itemId", name, "itemType", "itemDescription", effect, sprite) FROM stdin;
\.


--
-- Data for Name: pokeboxes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pokeboxes ("pokeboxId", "userId", "pokemonId", name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", "milesWalked", encounters, "createdAt", "updatedAt") FROM stdin;
2	6	5	2020-06-24 00:21:24.071873+00	2020-06-24 00:21:24.071873+00
3	15	24	2020-06-24 00:29:25.720064+00	2020-06-24 00:29:25.720064+00
6	15	24	2020-06-24 00:26:43.69367+00	2020-06-24 00:33:27.377226+00
\.


--
-- Name: backpackItems_backpackId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."backpackItems_backpackId_seq"', 1, false);


--
-- Name: items_itemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."items_itemId_seq"', 1, false);


--
-- Name: pokeboxes_pokeboxId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."pokeboxes_pokeboxId_seq"', 1, false);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 2, true);


--
-- Name: backpackItems backpackItems_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."backpackItems"
    ADD CONSTRAINT "backpackItems_pk" PRIMARY KEY ("backpackId");


--
-- Name: items items_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pk PRIMARY KEY ("itemId");


--
-- Name: pokeboxes pokeboxes_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pokeboxes
    ADD CONSTRAINT pokeboxes_pk PRIMARY KEY ("pokeboxId");


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY ("userId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

