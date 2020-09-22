CREATE TABLE "accounts" (
    "account_id" serial   NOT NULL,
    "first_name" varchar(50)   NULL,
    "last_name" varchar(50)   NULL,
    "email" varchar(50)   NOT NULL,
    "phoneNumber" char(10)   NULL,
    "password" varchar(200)   NOT NULL,
    "suspended" bool  DEFAULT false NOT NULL,
    CONSTRAINT "pk_Accounts" PRIMARY KEY (
        "account_id"
     )
);

CREATE TABLE "video" (
    "video_id" serial NOT NULL,
    "date" date    NULL,
    "latitude" varchar(200)   NULL,
    "longitude" varchar(200)  NULL,
    "city" varchar(50)   NULL,
    "state" char(2)   NULL,
    "zip" char(5)   NULL,
    "video_data" varchar NOT NULL,
    CONSTRAINT "pk_Video" PRIMARY KEY (
        "video_id"
     ),
     user_id int references accounts(account_id) NOT NULL
     
);

CREATE TABLE "driver_account" (
    "driver_id" serial  NOT NULL,
    "license_number" varchar(50)   NOT NULL,
    "license_state" char(2)   NOT NULL,
    "license_street_address" varchar(100)   NOT NULL,
    "license_zipcode" char(5)   NOT NULL,
    CONSTRAINT "pk_Driver_Account" PRIMARY KEY (
        "driver_id"
     ),
    CONSTRAINT "uc_Driver_Account_license_number" UNIQUE (
        "license_number"
    ),
     user_id int references accounts(account_id)
);

