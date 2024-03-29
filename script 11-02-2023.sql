USE [master]
GO
/****** Object:  Database [pobject_db]    Script Date: 11/02/2023 3:50:10 am ******/
CREATE DATABASE [pobject_db]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'pobject_db', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\pobject_db.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'pobject_db_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\pobject_db_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [pobject_db] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [pobject_db].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [pobject_db] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [pobject_db] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [pobject_db] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [pobject_db] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [pobject_db] SET ARITHABORT OFF 
GO
ALTER DATABASE [pobject_db] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [pobject_db] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [pobject_db] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [pobject_db] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [pobject_db] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [pobject_db] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [pobject_db] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [pobject_db] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [pobject_db] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [pobject_db] SET  DISABLE_BROKER 
GO
ALTER DATABASE [pobject_db] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [pobject_db] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [pobject_db] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [pobject_db] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [pobject_db] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [pobject_db] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [pobject_db] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [pobject_db] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [pobject_db] SET  MULTI_USER 
GO
ALTER DATABASE [pobject_db] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [pobject_db] SET DB_CHAINING OFF 
GO
ALTER DATABASE [pobject_db] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [pobject_db] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [pobject_db] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [pobject_db] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [pobject_db] SET QUERY_STORE = ON
GO
ALTER DATABASE [pobject_db] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [pobject_db]
GO
/****** Object:  Table [dbo].[tbl_Roles]    Script Date: 11/02/2023 3:50:10 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Roles](
	[Role_Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](100) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Description] [varchar](100) NULL,
	[IsActive] [bit] NULL,
	[CreatedOn] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Role_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_UserInfo]    Script Date: 11/02/2023 3:50:10 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_UserInfo](
	[Id_Pk] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [varchar](max) NOT NULL,
	[UserNumber] [int] NOT NULL,
	[CNIC] [nvarchar](30) NOT NULL,
	[Email] [nvarchar](max) NULL,
	[DisplayName] [varchar](100) NULL,
	[Phone] [nvarchar](20) NULL,
	[country] [varchar](100) NULL,
	[DOB] [date] NULL,
	[inActiveDate] [datetime] NULL,
	[CreatedOn] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id_Pk] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_users]    Script Date: 11/02/2023 3:50:10 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_users](
	[Id_Pk] [int] IDENTITY(1,1) NOT NULL,
	[UserNumber] [int] NOT NULL,
	[EmailOrUsername] [varchar](200) NOT NULL,
	[password] [nvarchar](max) NOT NULL,
	[password2] [nvarchar](max) NOT NULL,
	[UserId] [nvarchar](max) NOT NULL,
	[Salt] [nvarchar](max) NOT NULL,
	[InActiveDate] [datetime] NULL,
	[createdOn] [datetime] NULL,
	[RoleCode] [varchar](2) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id_Pk] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[tbl_Roles] ON 

INSERT [dbo].[tbl_Roles] ([Role_Id], [Code], [Name], [Description], [IsActive], [CreatedOn]) VALUES (1, N'A', N'Admin', N'This code is used for Admins Only', 1, CAST(N'2023-02-11T01:06:34.753' AS DateTime))
INSERT [dbo].[tbl_Roles] ([Role_Id], [Code], [Name], [Description], [IsActive], [CreatedOn]) VALUES (2, N'X', N'EndUser', N'This code is used for End Users Only', 1, CAST(N'2023-02-11T01:34:19.017' AS DateTime))
INSERT [dbo].[tbl_Roles] ([Role_Id], [Code], [Name], [Description], [IsActive], [CreatedOn]) VALUES (3, N'Y', N'Testing', N'Test purpose', 1, CAST(N'2023-02-11T03:37:50.750' AS DateTime))
SET IDENTITY_INSERT [dbo].[tbl_Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_UserInfo] ON 

INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (1, N'8029DF1E-81A8-41BA-B0C7-B44CC1973918', 4, N'23443-1232343243-1', NULL, N'Display Names In Ascending', N'032423423408', N'America', CAST(N'2022-08-22' AS Date), NULL, CAST(N'2023-02-05T05:31:29.730' AS DateTime))
SET IDENTITY_INSERT [dbo].[tbl_UserInfo] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_users] ON 

INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode]) VALUES (6, 4, N'startsssss', N'string', N'string', N'8029DF1E-81A8-41BA-B0C7-B44CC1973918', N'橽脱軛꾟�駲馗', NULL, CAST(N'2023-02-02T13:23:31.120' AS DateTime), N'A')
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode]) VALUES (7, 5, N'abubaker', N'string', N'string', N'94DA4E04-1085-4E8F-8DA0-22437F9DD8C4', N'ꪖ合鋏㋫�懟嗏ᓼ', NULL, CAST(N'2023-02-11T03:05:30.870' AS DateTime), N'X')
SET IDENTITY_INSERT [dbo].[tbl_users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [code_uniqueness]    Script Date: 11/02/2023 3:50:10 am ******/
ALTER TABLE [dbo].[tbl_Roles] ADD  CONSTRAINT [code_uniqueness] UNIQUE NONCLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__tbl_Role__A25C5AA794BB06CF]    Script Date: 11/02/2023 3:50:10 am ******/
ALTER TABLE [dbo].[tbl_Roles] ADD UNIQUE NONCLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__tbl_User__AA570FD4D684A44F]    Script Date: 11/02/2023 3:50:10 am ******/
ALTER TABLE [dbo].[tbl_UserInfo] ADD UNIQUE NONCLUSTERED 
(
	[CNIC] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__tbl_user__578B7EF6A1034C73]    Script Date: 11/02/2023 3:50:10 am ******/
ALTER TABLE [dbo].[tbl_users] ADD UNIQUE NONCLUSTERED 
(
	[UserNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__tbl_user__A41CDB08DB336220]    Script Date: 11/02/2023 3:50:10 am ******/
ALTER TABLE [dbo].[tbl_users] ADD UNIQUE NONCLUSTERED 
(
	[EmailOrUsername] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tbl_Roles] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tbl_Roles] ADD  DEFAULT (sysdatetime()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[tbl_UserInfo] ADD  DEFAULT (sysdatetime()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[tbl_users] ADD  DEFAULT (sysdatetime()) FOR [createdOn]
GO
USE [master]
GO
ALTER DATABASE [pobject_db] SET  READ_WRITE 
GO
