USE [pobject_db]
GO
/****** Object:  Table [dbo].[tbl_PendingRequests]    Script Date: 3/12/2023 3:54:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_PendingRequests](
	[id_pk] [int] IDENTITY(1,1) NOT NULL,
	[UsernameOrEmail] [varchar](max) NOT NULL,
	[UserId] [varchar](max) NOT NULL,
	[Payload] [varchar](max) NOT NULL,
	[Approved] [bit] NULL,
	[desc] [varchar](100) NULL,
	[CreatedOn] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_pk] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_Referrals]    Script Date: 3/12/2023 3:54:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Referrals](
	[ReferralId] [int] IDENTITY(1,1) NOT NULL,
	[ReferralCode] [varchar](10) NOT NULL,
	[ReferredUserId] [varchar](max) NOT NULL,
	[ReferredEmail] [varchar](100) NOT NULL,
	[ReferrerUserId] [varchar](max) NOT NULL,
	[ReferrerEmail] [varchar](100) NOT NULL,
	[CommissionAmount] [float] NOT NULL,
	[ReferralDate] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ReferralId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_Roles]    Script Date: 3/12/2023 3:54:04 PM ******/
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
/****** Object:  Table [dbo].[tbl_UserInfo]    Script Date: 3/12/2023 3:54:04 PM ******/
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
/****** Object:  Table [dbo].[tbl_users]    Script Date: 3/12/2023 3:54:04 PM ******/
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
	[referral_code] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id_Pk] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[tbl_PendingRequests] ON 

INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (1, N'dada', N'ACD7E8D1-6199-44E3-A624-574602D0EB56', N'string', 0, N'this is ser related information', CAST(N'2023-02-18T23:57:09.587' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (2, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'string', 0, N'string', CAST(N'2023-02-19T02:19:15.373' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (3, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'string', 0, N'string', CAST(N'2023-02-19T02:21:05.990' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (4, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'string', 0, N'string', CAST(N'2023-02-19T02:22:01.320' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (5, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'string', 0, N'string', CAST(N'2023-02-19T03:09:45.953' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (6, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'string', 0, N'string', CAST(N'2023-02-19T03:26:30.343' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (7, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'string', 0, N'string', CAST(N'2023-02-19T03:27:33.183' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (8, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'string', 0, N'string', CAST(N'2023-02-19T03:27:47.737' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (9, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'string', 0, N'string', CAST(N'2023-02-19T03:31:23.073' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (10, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'string', 0, N'string', CAST(N'2023-02-19T03:31:33.287' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (11, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'string', 0, N'string', CAST(N'2023-02-19T03:52:57.580' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (12, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"pp_Version":"1.1","pp_BankID":"","pp_ProductID":"","pp_Language":"EN","pp_SubMerchantID":"","pp_TxnRefNo":"","pp_Amount":"10000","pp_Password":"","pp_CNIC":"","pp_MobileNumber":"","pp_MerchantID":"","pp_TxnType":"","pp_DiscountedAmount":"","pp_TxnCurrency":"PKR","pp_TxnDateTime":"","pp_BillReference":"BillRef","pp_Description":"Hello","pp_TxnExpiryDateTime":"","pp_SecureHash":"","ppmpf_1":"","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":"","pp_ReturnURL":""}', 0, N'string', CAST(N'2023-02-19T03:54:02.950' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (13, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"pp_Version":"1.1","pp_BankID":"","pp_ProductID":"","pp_Language":"EN","pp_SubMerchantID":"","pp_TxnRefNo":"","pp_Amount":"10000","pp_Password":"","pp_CNIC":"","pp_MobileNumber":"","pp_MerchantID":"","pp_TxnType":"","pp_DiscountedAmount":"","pp_TxnCurrency":"PKR","pp_TxnDateTime":"","pp_BillReference":"BillRef","pp_Description":"Hello","pp_TxnExpiryDateTime":"","pp_SecureHash":"","ppmpf_1":"","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":"","pp_ReturnURL":""}', 0, N'string', CAST(N'2023-02-19T03:55:45.920' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (14, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"pp_Version":"1.1","pp_BankID":"","pp_ProductID":"","pp_Language":"EN","pp_SubMerchantID":"","pp_TxnRefNo":"","pp_Amount":"10000","pp_Password":"","pp_CNIC":"","pp_MobileNumber":"","pp_MerchantID":"","pp_TxnType":"","pp_DiscountedAmount":"","pp_TxnCurrency":"PKR","pp_TxnDateTime":"","pp_BillReference":"BillRef","pp_Description":"Hello","pp_TxnExpiryDateTime":"","pp_SecureHash":"","ppmpf_1":"","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":"","pp_ReturnURL":""}', 0, N'string', CAST(N'2023-02-19T03:58:14.547' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (15, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"pp_Version":"1.1","pp_BankID":"","pp_ProductID":"","pp_Language":"EN","pp_SubMerchantID":"","pp_TxnRefNo":"","pp_Amount":"10000","pp_Password":"","pp_CNIC":"","pp_MobileNumber":"","pp_MerchantID":"","pp_TxnType":"","pp_DiscountedAmount":"","pp_TxnCurrency":"PKR","pp_TxnDateTime":"","pp_BillReference":"BillRef","pp_Description":"Hello","pp_TxnExpiryDateTime":"","pp_SecureHash":"","ppmpf_1":"","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":"","pp_ReturnURL":""}', 0, N'string', CAST(N'2023-02-19T04:02:06.223' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (16, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"111111111111111111111111111pp_Version":"1.1","pp_BankID":"","pp_ProductID":"","pp_Language":"EN","pp_SubMerchantID":"","pp_TxnRefNo":"","pp_Amount":"10000","pp_Password":"","pp_CNIC":"","pp_MobileNumber":"","pp_MerchantID":"","pp_TxnType":"","pp_DiscountedAmount":"","pp_TxnCurrency":"PKR","pp_TxnDateTime":"","pp_BillReference":"BillRef","pp_Description":"Hello","pp_TxnExpiryDateTime":"","pp_SecureHash":"","ppmpf_1":"","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":"","pp_ReturnURL":""}', 0, N'string', CAST(N'2023-02-19T04:02:28.897' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (17, N'user1@gmail.com', N'3E6B0DB5-DC86-43A3-A645-C8930448C240', N'{"11111111111111111111xxxxx1111111pp_Version":"1.1","pp_BankID":"","pp_ProductID":"","pp_Language":"EN","pp_SubMerchantID":"","pp_TxnRefNo":"","pp_Amount":"10000","pp_Password":"","pp_CNIC":"","pp_MobileNumber":"","pp_MerchantID":"","pp_TxnType":"","pp_DiscountedAmount":"","pp_TxnCurrency":"PKR","pp_TxnDateTime":"","pp_BillReference":"BillRef","pp_Description":"Hello","pp_TxnExpiryDateTime":"","pp_SecureHash":"","ppmpf_1":"","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":"","pp_ReturnURL":""}', 0, N'string', CAST(N'2023-02-19T04:02:54.503' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (18, N'user1@gmail.com', N'3E6B0DB5-DC86-43A3-A645-C8930448C240', N'{"pp_Version":"1.1","pp_BankID":"","pp_ProductID":"","pp_Language":"EN","pp_SubMerchantID":"","pp_TxnRefNo":"","pp_Amount":"10000","pp_Password":"","pp_CNIC":"","pp_MobileNumber":"","pp_MerchantID":"","pp_TxnType":"","pp_DiscountedAmount":"","pp_TxnCurrency":"PKR","pp_TxnDateTime":"","pp_BillReference":"BillRef","pp_Description":"Hello","pp_TxnExpiryDateTime":"","pp_SecureHash":"","ppmpf_1":"","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":"","pp_ReturnURL":""}', 0, N'', CAST(N'2023-02-19T04:05:05.200' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (19, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'string', 0, N'string', CAST(N'2023-02-19T04:05:40.940' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (20, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'string', 0, N'string', CAST(N'2023-02-19T04:05:56.270' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (1002, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"pp_Version":"1.1","pp_BankID":"","pp_ProductID":"","pp_Language":"EN","pp_SubMerchantID":"","pp_TxnRefNo":"","pp_Amount":"10000","pp_Password":"","pp_CNIC":"","pp_MobileNumber":"","pp_MerchantID":"","pp_TxnType":"","pp_DiscountedAmount":"","pp_TxnCurrency":"PKR","pp_TxnDateTime":"","pp_BillReference":"BillRef","pp_Description":"Hello","pp_TxnExpiryDateTime":"","pp_SecureHash":"","ppmpf_1":"","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":"","pp_ReturnURL":""}', 0, N'', CAST(N'2023-02-19T15:55:48.853' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (1003, N'aliwajahat021@gmail.com', N'2A634ED9-D5B4-4AC0-A11C-7C5E91A4C662', N'{"pp_Version":"1.1","pp_BankID":"","pp_ProductID":"","pp_Language":"EN","pp_SubMerchantID":"","pp_TxnRefNo":"","pp_Amount":"10000","pp_Password":"","pp_CNIC":"","pp_MobileNumber":"","pp_MerchantID":"","pp_TxnType":"","pp_DiscountedAmount":"","pp_TxnCurrency":"PKR","pp_TxnDateTime":"","pp_BillReference":"BillRef","pp_Description":"Hello","pp_TxnExpiryDateTime":"","pp_SecureHash":"","ppmpf_1":"","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":"","pp_ReturnURL":""}', 0, N'', CAST(N'2023-02-19T15:56:40.350' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (1004, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"pp_Version":"1.1","pp_BankID":"","pp_ProductID":"","pp_Language":"EN","pp_SubMerchantID":"","pp_TxnRefNo":"","pp_Amount":"10000","pp_Password":"","pp_CNIC":"","pp_MobileNumber":"","pp_MerchantID":"","pp_TxnType":"","pp_DiscountedAmount":"","pp_TxnCurrency":"PKR","pp_TxnDateTime":"","pp_BillReference":"BillRef","pp_Description":"Hello","pp_TxnExpiryDateTime":"","pp_SecureHash":"","ppmpf_1":"","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":"","pp_ReturnURL":""}', 0, N'', CAST(N'2023-02-19T16:26:35.517' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (1005, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"pp_Version":"1.1","pp_BankID":"","pp_ProductID":"","pp_Language":"EN","pp_SubMerchantID":"","pp_TxnRefNo":"","pp_Amount":"10000","pp_Password":"","pp_CNIC":"","pp_MobileNumber":"","pp_MerchantID":"","pp_TxnType":"","pp_DiscountedAmount":"","pp_TxnCurrency":"PKR","pp_TxnDateTime":"","pp_BillReference":"BillRef","pp_Description":"Hello","pp_TxnExpiryDateTime":"","pp_SecureHash":"","ppmpf_1":"","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":"","pp_ReturnURL":""}', 0, N'', CAST(N'2023-02-19T16:41:29.173' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (1006, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"pp_Version":"1.1","pp_TxnType":"MWALLET","pp_Language":"EN","pp_MerchantID":"MC53678","pp_SubMerchantID":"","pp_Password":"808ww559vu","pp_BankID":"","pp_ProductID":"","pp_TxnRefNo":"T20230119164222","pp_Amount":"100","pp_TxnCurrency":"PKR","pp_TxnDateTime":"20230119164222","pp_BillReference":"billref","pp_Description":"Description of transaction","pp_TxnExpiryDateTime":"20230119174222","pp_ReturnURL":"http://localhost:3000/jazzcash/","pp_SecureHash":"cb4de9dafbfdf5a97f05e7c3255862b7a3cf76d009c28f246bb6c13df6bc8c14","ppmpf_1":"03432589896","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":""}', 0, N'', CAST(N'2023-02-19T16:47:44.173' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (1007, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"pp_Version":"1.1","pp_TxnType":"MWALLET","pp_Language":"EN","pp_MerchantID":"MC53678","pp_SubMerchantID":"","pp_Password":"808ww559vu","pp_BankID":"","pp_ProductID":"","pp_TxnRefNo":"T20230119174403","pp_Amount":"234234","pp_TxnCurrency":"PKR","pp_TxnDateTime":"20230119174403","pp_BillReference":"billref","pp_Description":"Description of transaction","pp_TxnExpiryDateTime":"20230119184403","pp_ReturnURL":"http://localhost:3000/jazzcash/","pp_SecureHash":"940acc784c4c6ac724a9b48a6989ce390deb443ff7105ed0e9fa013c5c99fc9b","ppmpf_1":"234","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":""}', 0, N'', CAST(N'2023-02-19T17:44:03.733' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (1008, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"pp_Version":"1.1","pp_TxnType":"MWALLET","pp_Language":"EN","pp_MerchantID":"MC53678","pp_SubMerchantID":"","pp_Password":"808ww559vu","pp_BankID":"","pp_ProductID":"","pp_TxnRefNo":"T20230119174839","pp_Amount":"1","pp_TxnCurrency":"PKR","pp_TxnDateTime":"20230119174839","pp_BillReference":"billref","pp_Description":"Description of transaction","pp_TxnExpiryDateTime":"20230119184839","pp_ReturnURL":"http://localhost:3000/jazzcash/","pp_SecureHash":"fb54c29cde291987026680a08e1f9c2050e9d15d8dabd9046b3609d840a66e418scc0yux1z","ppmpf_1":"03432589896","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":""}', 0, N'', CAST(N'2023-02-19T17:48:39.257' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (1009, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"pp_Version":"1.1","pp_TxnType":"MWALLET","pp_Language":"EN","pp_MerchantID":"MC53678","pp_SubMerchantID":"","pp_Password":"808ww559vu","pp_BankID":"","pp_ProductID":"","pp_TxnRefNo":"T20230119174850","pp_Amount":"100","pp_TxnCurrency":"PKR","pp_TxnDateTime":"20230119174850","pp_BillReference":"billref","pp_Description":"Description of transaction","pp_TxnExpiryDateTime":"20230119184850","pp_ReturnURL":"http://localhost:3000/jazzcash/","pp_SecureHash":"29491660a9371689eb3adeda6b3f277806942982de0d460bca7d17bf886eb6cc8scc0yux1z","ppmpf_1":"03432589896","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":""}', 0, N'', CAST(N'2023-02-19T17:50:54.123' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (1010, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"pp_Version":"1.1","pp_TxnType":"MWALLET","pp_Language":"EN","pp_MerchantID":"MC53678","pp_SubMerchantID":"","pp_Password":"808ww559vu","pp_BankID":"","pp_ProductID":"","pp_TxnRefNo":"T20230119175108","pp_Amount":"100","pp_TxnCurrency":"PKR","pp_TxnDateTime":"20230119175108","pp_BillReference":"billref","pp_Description":"Description of transaction","pp_TxnExpiryDateTime":"20230119185108","pp_ReturnURL":"http://localhost:3000/jazzcash/","pp_SecureHash":"fe49431b3e5e546bc3c6b32b68ab982a3abcf1d26194b228489e2ff16ed196128scc0yux1z","ppmpf_1":"03432589896","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":""}', 0, N'', CAST(N'2023-02-19T17:51:47.390' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (1011, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"pp_Version":"1.1","pp_TxnType":"MWALLET","pp_Language":"EN","pp_MerchantID":"MC53678","pp_SubMerchantID":"","pp_Password":"808ww559vu","pp_BankID":"","pp_ProductID":"","pp_TxnRefNo":"T20230119175259","pp_Amount":"100","pp_TxnCurrency":"PKR","pp_TxnDateTime":"20230119175259","pp_BillReference":"billref","pp_Description":"Description of transaction","pp_TxnExpiryDateTime":"20230119185259","pp_ReturnURL":"http://localhost:3000/jazzcash/","ppmpf_1":"03432589896","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":"","pp_SecureHash":"2df1f5b2a07e3f2f981b2354b4b6a7ea0a74b6155684df95af34838c2e3a51a38scc0yux1z"}', 0, N'', CAST(N'2023-02-19T17:53:39.773' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (1012, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"pp_Version":"1.1","pp_TxnType":"MWALLET","pp_Language":"EN","pp_MerchantID":"MC53678","pp_SubMerchantID":"","pp_Password":"808ww559vu","pp_BankID":"","pp_ProductID":"","pp_TxnRefNo":"T20230119175430","pp_Amount":"1234","pp_TxnCurrency":"PKR","pp_TxnDateTime":"20230119175430","pp_BillReference":"billref","pp_Description":"Description of transaction","pp_TxnExpiryDateTime":"20230119185430","pp_ReturnURL":"http://localhost:3000/jazzcash/","ppmpf_1":"03432589896","ppmpf_2":"","ppmpf_3":"","ppmpf_4":"","ppmpf_5":"","pp_SecureHash":"f24ebb174716c702c0595e1426910abdb5a70ff57ab64688dd672944aa8b396c"}', 0, N'', CAST(N'2023-02-19T17:55:41.780' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (2002, N'aliwajahat021@gmail.com', N'2A634ED9-D5B4-4AC0-A11C-7C5E91A4C662', N'{}', 0, N'', CAST(N'2023-03-09T00:33:20.270' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (2003, N'aliwajahat021@gmail.com', N'2A634ED9-D5B4-4AC0-A11C-7C5E91A4C662', N'{}', 0, N'', CAST(N'2023-03-09T00:36:03.920' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (2004, N'aliwajahat021@gmail.com', N'2A634ED9-D5B4-4AC0-A11C-7C5E91A4C662', N'{}', 0, N'', CAST(N'2023-03-09T00:36:34.860' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (2005, N'aliwajahat021@gmail.com', N'2A634ED9-D5B4-4AC0-A11C-7C5E91A4C662', N'{}', 0, N'', CAST(N'2023-03-09T00:37:17.227' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (2006, N'aliwajahat021@gmail.com', N'2A634ED9-D5B4-4AC0-A11C-7C5E91A4C662', N'{}', 0, N'', CAST(N'2023-03-09T00:37:55.560' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (2007, N'aliwajahat021@gmail.com', N'2A634ED9-D5B4-4AC0-A11C-7C5E91A4C662', N'{}', 0, N'', CAST(N'2023-03-09T00:39:46.930' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (2008, N'aliwajahat021@gmail.com', N'2A634ED9-D5B4-4AC0-A11C-7C5E91A4C662', N'{}', 0, N'', CAST(N'2023-03-09T00:40:43.920' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (2009, N'aliwajahat021@gmail.com', N'2A634ED9-D5B4-4AC0-A11C-7C5E91A4C662', N'{}', 0, N'', CAST(N'2023-03-09T00:41:44.227' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (2010, N'aliwajahat021@gmail.com', N'2A634ED9-D5B4-4AC0-A11C-7C5E91A4C662', N'{}', 0, N'', CAST(N'2023-03-09T00:42:49.210' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (2011, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{}', 0, N'', CAST(N'2023-03-09T00:54:14.927' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (2012, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{}', 0, N'', CAST(N'2023-03-09T00:55:49.680' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (2013, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{}', 0, N'', CAST(N'2023-03-09T00:57:25.067' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (2014, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{}', 0, N'', CAST(N'2023-03-09T00:57:51.207' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (2015, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{}', 0, N'', CAST(N'2023-03-09T01:15:54.390' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (3002, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"phoneNumber":"03432589896","cnicNumber":"42301-9397170-5","amount":"5"}', 0, N'', CAST(N'2023-03-09T11:21:31.767' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (3003, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"phoneNumber":"03432589896","cnicNumber":"42301-9397170-5","amount":"1"}', 0, N'', CAST(N'2023-03-09T11:22:45.743' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (4002, N'wajji@gmail.com', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'{"phoneNumber":"03432589896","cnicNumber":"42301-9397170-5","amount":"111"}', 0, N'', CAST(N'2023-03-10T23:07:07.827' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (5002, N'forextrader@gmail.com', N'6A43A40E-B2BA-4831-BF8A-F39AB8B4D4B9', N'{"phoneNumber":"03432589896","cnicNumber":"42301-9397180-0","amount":"100"}', 0, N'', CAST(N'2023-03-11T19:22:56.213' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (5003, N'forextrader@gmail.com', N'6A43A40E-B2BA-4831-BF8A-F39AB8B4D4B9', N'{"phoneNumber":"03432589896","cnicNumber":"42301-9397180-0","amount":"200"}', 0, N'', CAST(N'2023-03-11T19:24:03.133' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (5004, N'forextrader@gmail.com', N'6A43A40E-B2BA-4831-BF8A-F39AB8B4D4B9', N'{"phoneNumber":"03432589896","cnicNumber":"42301-9397170-5","amount":"1"}', 0, N'', CAST(N'2023-03-11T19:28:17.390' AS DateTime))
INSERT [dbo].[tbl_PendingRequests] ([id_pk], [UsernameOrEmail], [UserId], [Payload], [Approved], [desc], [CreatedOn]) VALUES (5005, N'forextrader@gmail.com', N'6A43A40E-B2BA-4831-BF8A-F39AB8B4D4B9', N'{"phoneNumber":"03432589896","cnicNumber":"42301-9397170-5","amount":"100"}', 0, N'', CAST(N'2023-03-11T22:12:44.973' AS DateTime))
SET IDENTITY_INSERT [dbo].[tbl_PendingRequests] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_Roles] ON 

INSERT [dbo].[tbl_Roles] ([Role_Id], [Code], [Name], [Description], [IsActive], [CreatedOn]) VALUES (1, N'A', N'Admin', N'This code is used for Admins Only', 1, CAST(N'2023-02-11T01:06:34.753' AS DateTime))
INSERT [dbo].[tbl_Roles] ([Role_Id], [Code], [Name], [Description], [IsActive], [CreatedOn]) VALUES (2, N'X', N'EndUser', N'This code is used for End Users Only', 1, CAST(N'2023-02-11T01:34:19.017' AS DateTime))
INSERT [dbo].[tbl_Roles] ([Role_Id], [Code], [Name], [Description], [IsActive], [CreatedOn]) VALUES (3, N'Y', N'Testing', N'Test purpose', 1, CAST(N'2023-02-11T03:37:50.750' AS DateTime))
SET IDENTITY_INSERT [dbo].[tbl_Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_UserInfo] ON 

INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (1, N'8029DF1E-81A8-41BA-B0C7-B44CC1973918', 4, N'23443-1232343243-1', NULL, N'Display Names In Ascending', N'032423423408', N'America', CAST(N'2022-08-22' AS Date), NULL, CAST(N'2023-02-05T05:31:29.730' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (2, N'2A634ED9-D5B4-4AC0-A11C-7C5E91A4C662', 8, N'', NULL, N'aliwajahat021@gmail.com', N'03432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), NULL, CAST(N'2023-02-18T17:11:36.153' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (1003, N'FF3301C8-52E5-45D6-B750-01E31B427C0C', 13, N'123', NULL, N'423423', N'234234', N'234234234', CAST(N'2020-01-01' AS Date), NULL, CAST(N'2023-02-18T18:45:57.453' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (1011, N'B6057934-3C79-4461-88F1-A779785EEA5F', 33, N'asdasdasdasdasd', NULL, N'aliwajahat021@gmail.com', N'03432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), CAST(N'2023-02-19T03:00:47.197' AS DateTime), CAST(N'2023-02-19T01:01:58.127' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (1012, N'3E6B0DB5-DC86-43A3-A645-C8930448C240', 34, N'123456789', NULL, N'user1', N'+923432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), NULL, CAST(N'2023-02-19T03:44:31.797' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (2002, N'0A56B29F-2378-466F-89D3-7A1B19D4CBE2', 35, N'4230193971705', NULL, N'aliwajah2at021@gmail.com', N'03432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), NULL, CAST(N'2023-03-08T17:03:48.537' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (2007, N'998149D3-AA13-4D59-9FCD-482666751BA7', 40, N'42301943971705', NULL, N'wajahat-forex', N'03432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), NULL, CAST(N'2023-03-08T17:08:02.687' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (2008, N'CDB7FA56-759E-47E9-8340-FFADBD503CD7', 41, N'42301555571705', NULL, N'wajahat-dev', N'03432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), NULL, CAST(N'2023-03-08T17:10:02.747' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (3002, N'E7C86D17-5F13-4BC9-B3F6-6987D8E1972F', 42, N'4230193971800', NULL, N'forexuser1@gmail.com', N'03432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), CAST(N'2023-03-08T22:39:58.133' AS DateTime), CAST(N'2023-03-08T22:35:03.107' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (3005, N'E433EF54-1E63-43FF-98FE-0F23A327D3D7', 49, N'424301943971705', NULL, N'aliwajahat021@gmail.com', N'03432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), NULL, CAST(N'2023-03-08T23:42:20.233' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (4002, N'6A43A40E-B2BA-4831-BF8A-F39AB8B4D4B9', 50, N'4230193971745', NULL, N'forextrader', N'03432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), NULL, CAST(N'2023-03-11T19:20:02.370' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (4004, N'BC171243-6758-4798-B78C-916E69809DBB', 52, N'4230193971555', NULL, N'notnull', N'03432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), NULL, CAST(N'2023-03-12T01:46:13.863' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (4005, N'DE627AB6-5DE1-4495-842A-7EE8B734F2CC', 53, N'4230143971705', NULL, N'aliwaja234hat021@gmail.com', N'03432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), NULL, CAST(N'2023-03-12T01:51:46.393' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (4006, N'E78D8B38-4B3F-4A27-93BD-51B14B1AC678', 54, N'4233153971705', NULL, N'aliwa3jahat021@gmail.com', N'03432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), NULL, CAST(N'2023-03-12T01:52:17.937' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (4007, N'C245FDFE-0C36-4FC1-81CD-E6D62ED9863E', 55, N'4230193971775', NULL, N'4230193971775@gmail.com', N'03432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), NULL, CAST(N'2023-03-12T01:54:42.127' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (4011, N'F2ADC4FC-6B87-4498-8E44-D74AF333385B', 59, N'4230193975705', NULL, N'alia15liwajahat4021wajahat021@gmail.com', N'03432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), NULL, CAST(N'2023-03-12T03:33:59.063' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (5006, N'329B35E7-D2ED-4265-96E1-01E9140BC976', 24, N'4230193944705', NULL, N'aliwajahat021@gmail.com', N'03432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), NULL, CAST(N'2023-03-12T15:33:48.870' AS DateTime))
INSERT [dbo].[tbl_UserInfo] ([Id_Pk], [UserId], [UserNumber], [CNIC], [Email], [DisplayName], [Phone], [country], [DOB], [inActiveDate], [CreatedOn]) VALUES (5007, N'68D73A42-DAA1-48C3-A91F-10451CBCA8AB', 25, N'3230133971715', NULL, N'aliwajahat021@gmail.com', N'03432589896', N'Pakistan', CAST(N'1900-01-01' AS Date), NULL, CAST(N'2023-03-12T15:48:34.700' AS DateTime))
SET IDENTITY_INSERT [dbo].[tbl_UserInfo] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_users] ON 

INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (6, 4, N'startsssss', N'string', N'string', N'8029DF1E-81A8-41BA-B0C7-B44CC1973918', N'橽脱軛꾟�駲馗', NULL, CAST(N'2023-02-02T13:23:31.120' AS DateTime), N'A', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (7, 5, N'abubaker', N'string', N'string', N'94DA4E04-1085-4E8F-8DA0-22437F9DD8C4', N'ꪖ合鋏㋫�懟嗏ᓼ', NULL, CAST(N'2023-02-11T03:05:30.870' AS DateTime), N'X', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (8, 6, N'wajahat', N'123', N'123', N'6B17E391-F127-4768-A9C1-9D8BB1EFE369', N'넭灺팎膁藊顧ڮ', CAST(N'2022-02-02T00:00:00.000' AS DateTime), CAST(N'2023-02-14T13:57:10.703' AS DateTime), N'A', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (1009, 8, N'aliwajahat021@gmail.com', N'aliwajahat021', N'aliwajahat021', N'2A634ED9-D5B4-4AC0-A11C-7C5E91A4C662', N'ç䙡�폿ᰴ䯴', NULL, CAST(N'2023-02-14T23:49:54.223' AS DateTime), N'x', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (1010, 9, N'234232342344', N'234232342344', N'234232342344', N'9CA69541-77A9-4369-8B75-ABDD79F7D351', N'迏염Ἓ粲ⱶ驝', NULL, CAST(N'2023-02-14T23:52:07.887' AS DateTime), N'x', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (1012, 10, N'2342323423441', N'234232342344', N'234232342344', N'B0DFC8BA-2722-4394-AE1B-C5B3ACD48C53', N'䒜㘦℁␂䔮糋❊ꊥ', NULL, CAST(N'2023-02-14T23:52:24.000' AS DateTime), N'x', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (1014, 11, N'wajahat1', N'wajahat1', N'wajahat1', N'C0485B3B-E135-4393-8174-E322C881090A', N'㴋宰澈갗ࢲ䵥킵', NULL, CAST(N'2023-02-14T23:53:15.623' AS DateTime), N'x', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (1015, 12, N'123', N'123', N'123', N'F87D0C80-5F42-4B90-A440-FEE14B1770FB', N'�镼ﺤﴙ暠侠', NULL, CAST(N'2023-02-15T00:02:27.123' AS DateTime), N'x', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (2008, 13, N'wajji@gmail.com', N'wajji', N'wajji', N'FF3301C8-52E5-45D6-B750-01E31B427C0C', N'雰�筜꘹觏愕ઊ끞', NULL, CAST(N'2023-02-18T16:24:24.213' AS DateTime), N'A', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (3008, 14, N'123@gmail.com', N'123@gmail.com', N'123@gmail.com', N'7ADEF3AA-7859-4E34-9993-81FAC3411669', N'৬⬉럷挼�ى⩨', NULL, CAST(N'2023-02-18T20:05:16.447' AS DateTime), N'x', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (3010, 15, N'1234@gmail.com', N'123@gmail.com', N'123@gmail.com', N'8FE40E11-6BAD-4FEB-B711-9751948C12E7', N'괆銨蝁害鉂氵潹', NULL, CAST(N'2023-02-18T20:05:55.207' AS DateTime), N'x', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (3011, 16, N'12345@gmail.com', N'123@gmail.com', N'123@gmail.com', N'30134AE5-0F69-44EB-8585-03678C63F4E8', N'琦殪齾聈ⷺ卆䔷', NULL, CAST(N'2023-02-18T20:06:16.490' AS DateTime), N'x', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (3012, 17, N'a@gmail.com', N'a@gmail.com', N'a@gmail.com', N'226A0366-DD5B-4E5C-9596-38F0E9D12876', N'ᮝ蚫饀⃧ᑳ�龲', NULL, CAST(N'2023-02-18T20:07:04.233' AS DateTime), N'x', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (3014, 18, N'aa@gmail.com', N'a@gmail.com', N'a@gmail.com', N'E106939F-E164-4D83-A257-E00FBCBBDABB', N'뛈䮧츻@켘ꨎ鸘⁰', NULL, CAST(N'2023-02-18T20:08:29.347' AS DateTime), N'x', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (3015, 19, N'aliw33ajahat021@gmail.com', N'aliw33ajahat021@gmail.com', N'aliw33ajahat021@gmail.com', N'D507AD71-3CA4-43CB-9E79-C43D99593CB2', N'紆晑黧꣭褐ⴗꮠ鋅', NULL, CAST(N'2023-02-18T20:10:13.650' AS DateTime), N'x', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (3016, 20, N'aliwajggahat021@gmail.com', N'aliwajggahat021@gmail.com', N'aliwajggahat021@gmail.com', N'A88AE7CA-C411-4872-96E0-CE62E137D45C', N'拃䆨쁍혾喵㌞', NULL, CAST(N'2023-02-18T20:10:37.083' AS DateTime), N'x', NULL)
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (7012, 21, N'abcdefg@gmail.com', N'wajji', N'wajji', N'6CEBD12A-32A0-45E7-BC7A-437F640C2EB5', N'꜒匊ൣ듳謂⬡ꓲ곫', NULL, CAST(N'2023-03-12T15:28:55.913' AS DateTime), N'X', N'Y6BYHO97Q1')
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (7013, 22, N'abcdef@gmail.com', N'wajji', N'wajji', N'58B3F9E6-C45C-4B93-A66F-964CE4ED6C19', N'꼋㙗䅖総↍ꝅ鷚', NULL, CAST(N'2023-03-12T15:30:35.747' AS DateTime), N'X', N'AASFQMV0TL')
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (7014, 23, N'abcdeff@gmail.com', N'wajji', N'wajji', N'75425234-F2D2-4F8E-8B3E-861619306DB6', N'ዻ횃䝥飃瀲罉�', NULL, CAST(N'2023-03-12T15:32:27.373' AS DateTime), N'X', N'01P7WFD574')
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (7015, 24, N'abcdef4f@gmail.com', N'wajji', N'wajji', N'329B35E7-D2ED-4265-96E1-01E9140BC976', N'﮾ꞙФ뻓쬔嫞왏', NULL, CAST(N'2023-03-12T15:33:44.567' AS DateTime), N'X', N'055CGZZHTM')
INSERT [dbo].[tbl_users] ([Id_Pk], [UserNumber], [EmailOrUsername], [password], [password2], [UserId], [Salt], [InActiveDate], [createdOn], [RoleCode], [referral_code]) VALUES (7016, 25, N'wajji1@gmail.com', N'wajji', N'wajji', N'68D73A42-DAA1-48C3-A91F-10451CBCA8AB', N'ᘷ媙ས究鲯鐍켤', NULL, CAST(N'2023-03-12T15:48:33.663' AS DateTime), N'X', N'FVUGZUVRS7')
SET IDENTITY_INSERT [dbo].[tbl_users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__tbl_Refe__7E06781237875F89]    Script Date: 3/12/2023 3:54:04 PM ******/
ALTER TABLE [dbo].[tbl_Referrals] ADD UNIQUE NONCLUSTERED 
(
	[ReferralCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [code_uniqueness]    Script Date: 3/12/2023 3:54:04 PM ******/
ALTER TABLE [dbo].[tbl_Roles] ADD  CONSTRAINT [code_uniqueness] UNIQUE NONCLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__tbl_Role__A25C5AA75631059D]    Script Date: 3/12/2023 3:54:04 PM ******/
ALTER TABLE [dbo].[tbl_Roles] ADD UNIQUE NONCLUSTERED 
(
	[Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__tbl_User__AA570FD439FE6B80]    Script Date: 3/12/2023 3:54:04 PM ******/
ALTER TABLE [dbo].[tbl_UserInfo] ADD UNIQUE NONCLUSTERED 
(
	[CNIC] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__tbl_user__578B7EF69B4D9A2C]    Script Date: 3/12/2023 3:54:04 PM ******/
ALTER TABLE [dbo].[tbl_users] ADD UNIQUE NONCLUSTERED 
(
	[UserNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__tbl_user__A41CDB088963D53A]    Script Date: 3/12/2023 3:54:04 PM ******/
ALTER TABLE [dbo].[tbl_users] ADD UNIQUE NONCLUSTERED 
(
	[EmailOrUsername] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tbl_PendingRequests] ADD  DEFAULT ((0)) FOR [Approved]
GO
ALTER TABLE [dbo].[tbl_PendingRequests] ADD  DEFAULT (sysdatetime()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[tbl_Referrals] ADD  DEFAULT (sysdatetime()) FOR [ReferralDate]
GO
ALTER TABLE [dbo].[tbl_Roles] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tbl_Roles] ADD  DEFAULT (sysdatetime()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[tbl_UserInfo] ADD  DEFAULT (sysdatetime()) FOR [CreatedOn]
GO
ALTER TABLE [dbo].[tbl_users] ADD  DEFAULT (sysdatetime()) FOR [createdOn]
GO
ALTER TABLE [dbo].[tbl_users] ADD  DEFAULT ('') FOR [referral_code]
GO
