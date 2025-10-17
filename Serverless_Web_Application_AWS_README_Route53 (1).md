Serverless Web Application on AWS: S3, API Gateway, Lambda, DynamoDB, CloudFront, and Route 53

📘 Overview

This project demonstrates how to build and deploy a fully serverless
web application** on AWS.\
The application architecture leverages key AWS services --- S3, API
Gateway, Lambda, DynamoDB, CloudFront, and Route 53 --- to create a
scalable, cost-efficient, and globally available web solution.

------------------------------------------------------------------------

🎯 Objective

To design a cloud-native web application that performs CRUD operations
through a serverless backend while hosting the frontend securely on AWS.

------------------------------------------------------------------------

⚙️ Architecture

    User Browser
       ↓
    CloudFront (CDN)
       ↓
    S3 (Static Website Hosting)
       ↓
    API Gateway → Lambda → DynamoDB
       ↓
    Route 53 (Custom Domain)

------------------------------------------------------------------------

🧩 AWS Services Used

  -----------------------------------------------------------------------
  Service                             Purpose
  ----------------------------------- -----------------------------------
  Amazon S3                           Host static frontend (HTML, CSS,
                                      JavaScript).

  Amazon CloudFront                   Content delivery and caching for
                                      performance.

  Amazon API Gateway                  RESTful API endpoints for frontend
                                      communication.

  AWS Lambda                          Backend logic for CRUD operations.

  Amazon DynamoDB                     NoSQL database for storing data.

  Amazon Route 53                     Custom domain management and DNS
                                      routing.

  IAM                                 Secure role-based access for AWS
                                      services.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

🧠 Features

-   Fully serverless (no EC2 or manual servers)
-   CRUD operations (Create, Read, Update, Delete)
-   API integration between frontend and backend
-   Secure IAM permissions
-   Global delivery via CloudFront
-   Custom domain configuration using Route 53
-   Scalable and low-cost infrastructure

------------------------------------------------------------------------

 🚀 Implementation Steps

    1. Frontend Deployment (S3 & CloudFront)

-   Create an S3 bucket and enable static website hosting.
-   Upload `index.html`, `style.css`, and `script.js`.
-   Create a CloudFront distribution linked to the S3 bucket.
-   Configure HTTPS with AWS Certificate Manager.

    2. Backend (Lambda + API Gateway)

-   Create Lambda functions for CRUD logic (Node.js/Python).
-   Configure DynamoDB access in IAM roles.
-   Create a REST API in API Gateway and integrate with Lambda.
-   Enable CORS for frontend access.

    3. Database (DynamoDB)

-   Create a DynamoDB table (e.g., `Todos` or `Items`).
-   Define a partition key (`id`).

    4. Domain Setup (Route 53)

-   Register a custom domain or use an existing one.
-   Create a hosted zone in Route 53.
-   Configure alias records to map the domain to the CloudFront
    distribution.

   5. Connect Frontend and Backend

-   Add API endpoint URLs in your JavaScript frontend.
-   Test all CRUD operations via the deployed frontend.

------------------------------------------------------------------------

🧰 Technologies Used

-  Frontend:  HTML, CSS, JavaScript
-   Backend:  AWS Lambda (Node.js/Python)
-  Database:  DynamoDB
-  Cloud Services: S3, API Gateway, Lambda, CloudFront, IAM, Route 53

------------------------------------------------------------------------

📊 Outcome

-   Successfully hosted a dynamic web app using AWS Serverless Stack.
-   Improved performance and scalability using CloudFront CDN.
-   Custom domain routing achieved with Route 53 integration.
-   Reduced operational cost by adopting a fully managed, pay-as-you-go
    model.

------------------------------------------------------------------------

📸 Architecture Diagram
<img width="1536" height="1024" alt="ChatGPT Image Oct 17, 2025, 08_58_13 PM" src="https://github.com/user-attachments/assets/db423e1d-93bd-496e-b1df-890665a2e1b7" />

------------------------------------------------------------------------

💡 Future Enhancements

-   Add user authentication with Amazon Cognito.
-   Implement CI/CD pipeline using AWS CodePipeline or GitHub
    Actions.

------------------------------------------------------------------------

🧑‍💻 Author

Syed Afnan
Cloud & DevOps Enthusiast 

------------------------------------------------------------------------
