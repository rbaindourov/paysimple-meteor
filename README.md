# paysimple-meteor

This is a Meteor 1.2 Project to integrate with paysimple.com API using ES2015 and ReactJS.
Make sure to replace username and secret code in settings.json file to match your account.


My employer requested that I recreate a simple accounts settled report page for our internal network.
My goal was to create an example for the community and sharpen my skills.

You can follow along with the [official tutorial](https://www.meteor.com/tutorials/react/creating-an-app) if you want to understand the basic steps necessary to get ReactJS project similar to this one, setup.

I am structuring my components, server, and client code into separate folders for better separation.
Also incorporating platform agnostic RequestJS and NodeJS built in `crypto` for API integration.

```
meteor add froatsnook:request
```
