# Piu Piu

Live player list for laser tag and stuff.

[Adobe XD prototype](https://xd.adobe.com/view/2d770107-454f-4ca6-b986-1bca120404ce-7824)

# Development

## Client (React)

Run `npm start` to start the React application locally.

## Backend (AWS)

An AWS account is required to develop the backend of this project.

### Configuration

**Step 1**: Create an Access Key for your account.
1. Log in to the AWS console using a web browser.
2. Click your account name on the top right and select **My Security Credentials** from the dropdown.
3. Press the **Create Access Key** button.
4. Do not close the popup displaying your access key info just yet.

**Step 2**: Install the AWS CLI.
1. Follow the directions on [this page](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) to install the AWS CLI.
2. Make sure the AWS CLI is installed by running `aws --version` in your terminal.

**Step 3**: Configure the AWS CLI.
1. Run `aws configure` in your terminal.
2. Enter the **Access Key ID** and **Secret Access Key** when prompted. These are the values you created in step 1.
3. Complete the configuration. You are now set!

# Deployment

## Client (React)

Client deployment will be implemented later. The plan is to either use S3 or GitHub Pages.

## Backend (AWS)

Run the following commands to deploy everything. Replace the profile name with your own or omit the parameter entirely if your default profile is configured correctly.

```bash
cd server # Unless you're already in the server directory
npm run compile # Compile TypeScript
sls deploy [--aws-profile your-aws-profile-name]
```