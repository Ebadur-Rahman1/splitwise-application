<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Splitwise Backend APIs</title>

    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }

        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #4f46e5, #9333ea);
            color: #fff;
        }

        .container {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(15px);
            padding: 50px 40px;
            border-radius: 20px;
            max-width: 600px;
            text-align: center;
            box-shadow: 0 15px 40px rgba(0,0,0,0.2);
            animation: fadeIn 1s ease-in-out;
        }

        h1 {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
        }

        p {
            font-size: 16px;
            opacity: 0.9;
            margin-bottom: 25px;
            line-height: 1.6;
        }

        .link-btn {
            display: inline-block;
            padding: 12px 25px;
            background: #ffffff;
            color: #4f46e5;
            text-decoration: none;
            font-weight: 600;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .link-btn:hover {
            background: #f3f4f6;
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        .badge {
            display: inline-block;
            margin-top: 15px;
            font-size: 13px;
            padding: 6px 12px;
            background: rgba(255,255,255,0.2);
            border-radius: 50px;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 600px) {
            .container {
                padding: 35px 20px;
            }

            h1 {
                font-size: 24px;
            }

            p {
                font-size: 14px;
            }
        }
    </style>
</head>

<body>

    <div class="container">
        <h1>Splitwise Application Backend APIs</h1>

        <p>
            This directory contains the local and working backend APIs
            developed for the Splitwise React Application.
        </p>

        <a href="http://localhost:5173/" 
           class="link-btn" target="_blank">
            Visit React Frontend
        </a>

        <div class="badge">
            Laravel API • JWT Auth • Production Ready
        </div>
    </div>

</body>
</html>
