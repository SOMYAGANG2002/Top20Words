Deployed this application on Vercel.com -> https://top20-words.vercel.app

--------------------------------Procedure--------------------------------

Finding Top 20 most occuring words!

1) We will set up a new React.js project, so by making a folder and opening it with vscode we will go in terminal and will create a react app named top20words from the command -> npx create-react-app top20words.

2) In src folder in 'App.js' we will make a div conatiner and give h1 heading inside it. We will create a new component named as 'Top20Words.jsx' and we will load this component in  App.js below h1 tag.

3) Now we will install '3 Libraries' for our task ->
   (a) axios for requesting data from an API,
   (b) react-google-charts for ploting charts,
   (c) react-bootstrap for css.

4) Now in Top20Words.jsx we will create a 'Submit' button (using bootstrap) and give it an 'onclick' event to fetch our data from 'https://www.terriblytinytales.com/test.txt' (axios library will work here to make a HTTP GET request to get the data from the url).

5) We will split the data into single(individual) words and make a function to count the frequency of each word. Then we will take only the top 20 words from the array formed by sorting the array in decending format. We will create a new array as 'histogramData' and add the words and frequency by initializing header row as Word and Frequency.

6) Now for exporting this data to 'CSV' format we will create another button 'Export to CSV' and give it an 'onClick' event which will convert the data inside 'histogramData' into CSV string representation.

7) For Ploting a Histogram we will be using react-google-chart library. We will create a 'Ternary Operator' that if 'wordFrequency.length > 0' code inside the div will be rendered otherwise, null will be returned. This div contains a h2 tag and a chart component.
h2 - Top 20 Words
chart - we will set size, style, chartType, data, options(title, legend, hAxis, vAxis, backgroundColor) according to  our need.
Here chartType will be 'Histogram' and data will be taken as a prop from wordFrequency.

8) After performing the above task we can finally look at our result from terminal by entering the command-> npm start

On the first load we see->
Finding Top 20 most occurring words!
and a 'Submit' button.
Upon clicking the Submit button we see a histogram(representing frequency of top 20 words) and a 'Export To CSV' button.
