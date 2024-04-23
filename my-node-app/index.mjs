const AWS = require('aws-sdk');

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  try {
    // Extract user information from the event
    const { userName } = event.request.userAttributes;

    // Update user attributes
    const params = {
      UserPoolId: 'eu-west-2_OMVOG8Vvr',
      Username: userName,
      UserAttributes: [
        {
          Name: 'phone_number',
          Value: '+910000000000',
        },
      ],
    };

    await cognitoIdentityServiceProvider.adminUpdateUserAttributes(params).promise();

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Phone number updated successfully' }),
    };
  } catch (error) {
    // Return an error response if an error occurs
    console.error('Error updating phone number:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while updating phone number' }),
    };
  }
};
