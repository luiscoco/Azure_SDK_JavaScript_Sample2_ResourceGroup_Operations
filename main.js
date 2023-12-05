//https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/next-generation-quickstart.md

const resources = require("@azure/arm-resources");
const identity = require("@azure/identity");

//Authentication and Setup
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const credential = new identity.DefaultAzureCredential();
const resourcesClient = new resources.ResourceManagementClient(credential, subscriptionId);

//Create a ResourceGroup
async function createResourceGroup(resourceGroupName) {
    const parameter = {
        location: "eastus",
        tags: {
            tag1: "value1"
        }
    };
    const resourcesClient = new resources.ResourceManagementClient(credential, subscriptionId);
    await resourcesClient.resourceGroups.createOrUpdate(resourceGroupName, parameter).then(
        result => {
            console.log(result);
        }
    )
}

//Update a ResourceGroup
async function updateResourceGroup(resourceGroupName) {
    const parameter = {
        tags: {
            tag1: "value1",
            tag2: "value2"
        }
    };
    await resourcesClient.resourceGroups.update(resourceGroupName, parameter).then(
        result => {
            console.log(result);
        }
    )
}

//List all ResourceGroups
async function listResourceGroup() {
    const result_list = new Array();
    for await (let item of resourcesClient.resourceGroups.list()){
        result_list.push(item);
    }
    console.log(result_list);
}

//Get a ResourceGroup
async function getResourceGroup(resourceGroupName) {
    const get_result = await resourcesClient.resourceGroups.get(resourceGroupName);
    console.log(get_result);
}

//Delete a ResourceGroup
async function deleteResourceGroup(resourceGroupName) {
    await resourcesClient.resourceGroups.beginDeleteAndWait(resourceGroupName).then(
        result => {
            console.log(result);
        }
    )
}

// Main function
async function main() {
    const resourceGroupName = "mynewRG";
    await createResourceGroup(resourceGroupName);
    await listResourceGroup();
    await getResourceGroup(resourceGroupName);
    await updateResourceGroup(resourceGroupName);
    await getResourceGroup(resourceGroupName);
    await deleteResourceGroup(resourceGroupName);
    await listResourceGroup();
}
      
// Call the main function
main();

