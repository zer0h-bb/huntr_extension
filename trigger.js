function getReward(url)
{
	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'https://mnk2smepzzdp5djxpbthzr6odq.appsync-api.eu-west-1.amazonaws.com/graphql', false);
	console.log("Sending a request ");

	xhr.setRequestHeader("x-api-key", "da2-fql7xoajcng6pilmew4lfbi6ga");

	xhr.onreadystatechange = function() {
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			console.log("Got reward : "+JSON.parse(xhr.response).data.getBountyMetrics.bounty_reward);
			reward = JSON.parse(xhr.response).data.getBountyMetrics.bounty_reward;
			  var obj = {_reward: reward.toString(), _url:url};
  var sending = browser.runtime.sendMessage(obj);
  sending.then(handleResponse, handleError);
    }}
	
	/*xhr.send(JSON.stringify({
            query: `
            query GetBountyMetrics($url: AWSURL!) {
                getBountyMetrics(url: $url) {
                bounty_reward
                }
            }`,
            variables: {
                url
            }
        }));*/
	//url = https://github.com/zer0h-bb/zer0h-bb/blablabla
	//url.split("/") == [ "https:", "", "github.com", "zer0h-bb", "zer0h-bb", "blablabla" ]
	owner = url.split("/")[3]
	project_name = url.split("/")[4]
	request = '{"operationName":"GetBountyMetrics","variables":{"owner":"'+owner+'","name":"'+project_name+'"},"query":"query GetBountyMetrics($owner: String!, $name: String!) {getBountyMetrics(owner: $owner, name: $name) {bounty_reward}}"}'
	xhr.send(request);
}



function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}


getReward(window.location.href);

console.log("Huntr module loaded");

