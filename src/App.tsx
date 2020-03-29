import * as React from "react";
import "./styles.css";
import {observable} from "mobx";
import {observer} from "mobx-react";

type Article = {name:string,author?:string,pages?:number};

const testData = observable<{articles:Article[]}>({
  articles:[{name:"How to Score Big",author:"Sally Jones",pages:20},
  {name:"Let's Do It Guide",author:"Mabel Sucralose",pages:30}]
});

const moreData:Article[] = [
{
  name:"How to Sleep with your Friends",
  pages:10,
  author: "Billy Lovelock"
},
{
  name:"Success is it worth it",
  pages:12,
  author:"Gale Neeleman"
},
{
  name:"Theories are for Chumps, Try Action",
  pages:23,
  author:"Golan Heights"
}
];

let cnt = 0;
const int1  = setInterval(() => {
  console.log("Added:" + moreData[cnt].name);
  testData.articles.push(moreData[cnt++]);
  if(cnt === 3){
    clearInterval(int1);
  }
},1000)


let cnt2 = 0;
const int2 = setInterval(() => {
  const update = {name:("Censored" + cnt2++)};
  testData.articles[cnt2] = {...testData.articles[cnt2],...update}
  if(cnt2 === 5){
    clearInterval(int2);
  }
},2000)


const Article = observer((props:{article:Article}) => {
    console.log("Swimming alive");
    return <div><div>{props.article.name}</div><div>{props.article.author}</div><div>{props.article.pages}</div></div>
})


const ObservableList = observer((props:{articles:Article[]}) => {
  console.log("I am here again")
  return <div>{props.articles.map(
      (item,idx) => <li key={idx}>{<Article article={item} />}</li>
    )}
    </div>;
})


export default function App() {
  return (
    <div className="App">
      <ul>
        <ObservableList articles={testData.articles}/>
      </ul>
    </div>
  );
}
