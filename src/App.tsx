import { useState, useMemo, useEffect } from "react";


function App() {
  const checkIfInteger = /^[1-9]*$/;
  const [solveOnClick, setSolveOnClick] = useState(false)
  const [gameSetterOnClick, setGameSetterOnClick] = useState(false)
  const [restartOnClick, setRestartOnClick] = useState(false)
  const [sudokuArray, setSudokuArray] = useState(new Array(9*9).fill(""))
  const [checkAll, setCheckAll] = useState(new Array(9*3).fill([...Array(9)].map((_, index)=>index + 1)))
  const [storedPlaySudoku, setStoredPlaySudoku] = useState<number[]>([])
  const [difficulty,setDifficulty] = useState("4")
  const [gameStarted, setGameStarted] = useState(false)
  const [isSolved, getIsSolved] = useState(false)
  const [solvedStatus, setSolvedStatus] = useState("")

  const checkWithinGrid = (index:number) => {
    let base = {
      "18":0,
      "19":3,
      "20":6,
      "21":27,
      "22":30,
      "23":33,
      "24":54,
      "25":57,
      "26":60,
     }
     let baseValue = Object.values(base)
     let baseKeys = Object.keys(base)
     for(let i = 0; i < baseValue.length; i++) {
      let head = baseValue[i]
      let tail = baseValue[i] + 2
      if((head <= index && index <=tail)|| ((head + 9) <= index && index <= (tail + 9))||((head + 18) <= index && index <=(tail + 18))){
        return Number(baseKeys[i])
      }
     }
  }

  
  const eachTracking = useMemo(()=>{
    let record:any = {}
    for(let i = 0 ; i < 9*9 ; i++){
      record[`${i}`] = [Math.floor(i / 9),(i % 9) + 9, checkWithinGrid(i)]
    }
    return record
  },[])


  const upperHorizontalLine = useMemo(()=>{
    const upperHorizontalLineNums:number[] = []
    for(let i = 18 ; i <= 26 ; i++){
      upperHorizontalLineNums.push(i)
    }
    return upperHorizontalLineNums
  },[])
  const leftVerticalLine = useMemo(()=>{
    const leftVerticalLineNums:number[] = []
    for(let i = 2 ; i <= 74 ; i+=9){
      leftVerticalLineNums.push(i)
    }
    return leftVerticalLineNums
  },[])

  const rightVerticalLine = useMemo(()=>{
    const rightVerticalLineNums:number[] = []
    for(let i = 6 ; i <= 78 ; i+=9){
      rightVerticalLineNums.push(i)
    }
    return rightVerticalLineNums
  },[])

  const lowerHorizontalLine = useMemo(()=>{
    const lowerHorizontalLineNums:number[] = []
    for(let i = 54 ; i <= 62 ; i++){
      lowerHorizontalLineNums.push(i)
    }
    return lowerHorizontalLineNums
  },[])

  const arrChecking = (arr: any[]) => {
    const number:any = {
      "1":1,
      "2":1,
      "3":1,
      "4":1,
      "5":1,
      "6":1,
      "7":1,
      "8":1,
      "9":1,
    }
    for(let i = 0 ; i < arr.length ; i++){
      if(number[`${arr[i]}`]){
        number[`${arr[i]}`]--
      }else if (number[`${arr[i]}`] === 0){
        return false
      }
     
    }
    return true
  }
  const checkIfValid = (sudokuArr = sudokuArray) => {


    let keys:any = Object.keys(eachTracking)
    let values:any = Object.values(eachTracking)
    let newSudokuArr = [...sudokuArr]

    for(let i = 0 ; i < checkAll.length ; i++){
      let eachChecking:number[] = []
      values.map((arr:number[], indx:number)=>{
        if(arr.includes(i)){
          eachChecking.push(Number(keys[indx]))
        }
      })
      let anotherArr:number[] = []
      newSudokuArr.map((num, index)=>{
        if(eachChecking.includes(index)){
          anotherArr.push(num)
        }
      })
      if(!arrChecking(anotherArr)){
        return false
      }
    }
    return true
  }

  const allFilled = (arr: (string|number)[]) => {
    return arr.every((e)=>typeof e === 'number')
  }
  useEffect(()=>{
    if(allFilled(sudokuArray) && checkIfValid(sudokuArray)){
      setSolvedStatus("Solved!")
    }

  },[sudokuArray])

  const randomDrawNumber = (newArr:any, arr:any) => {
    const number:any = {
      "1":0,
      "2":0,
      "3":0,
      "4":0,
      "5":0,
      "6":0,
      "7":0,
      "8":0,
      "9":0,
    }
    let allHave:any = []
    let first = newArr[arr[0]]
    let second = newArr[arr[1]]
    let third = newArr[arr[2]]

    for(let i = 1 ; i < 10 ; i++){
      if(first.indexOf(i) !== -1){
        number[`${i}`]++
      }
      if(second.indexOf(i) !== -1){
        number[`${i}`]++
      }

      if(third.indexOf(i) !== -1){
        number[`${i}`]++
      }

      if(number[`${i}`] === 3){
        allHave.push(i)
      }
      
    }
    if(allHave.length ===0){
     return ""
    }
    let drawIndex = Math.floor(Math.random() * allHave.length)
    return allHave[drawIndex]
  }
  
  const repeatIfFail = (play=false) => {
    let newArr = [...checkAll]
    let newSukodu = [...sudokuArray]
    for(let i = 0 ; i < 9*9 ;i++){
      if( newSukodu[i] === ""){
        let deductArr = eachTracking[`${i}`]
        let drawnNum:number = randomDrawNumber(newArr, deductArr)
         newSukodu[i] = drawnNum
          for(let x = 0 ;x < deductArr.length ; x++){
            newArr[deductArr[x]] = newArr[deductArr[x]].filter((e:number)=>{
              return drawnNum !==e
            })
          }
      }
    }

    if(newSukodu.some((e)=>e==="")){
      repeatIfFail(play)
    }else{
      if(play){
        setStoredPlaySudoku([...newSukodu])
        let checkAllArr = new Array(9*3).fill([...Array(9)].map((_, index)=>index + 1))
        for(let i = 0 ; i < newSukodu.length;i++){
          let filterOut = Math.floor(Math.random() * 10)
          if(filterOut < Number(difficulty)){
            newSukodu[i] = ""
          }else{
              let deductArray = eachTracking[`${i}`]
              for(let x = 0 ;x < deductArray.length ; x++){
                checkAllArr[deductArray[x]]= checkAllArr[deductArray[x]].filter((e:number)=>{
                  return Number(e)!== Number(newSukodu[i])
                })
              }
          }
        }
        setCheckAll(checkAllArr)
        setSudokuArray(newSukodu)
      }else{
        setSudokuArray(newSukodu)

      }
    }
  }

  const setGame = () => {
    setGameSetterOnClick(true)
    setGameStarted(true)
    if(!gameStarted){
      repeatIfFail(true)

    }
    setTimeout(() =>{
      setGameSetterOnClick(false)
    },100)
  }
  const solveGame = () =>{
    setSolveOnClick(true)
    if(checkIfValid()){
      if(storedPlaySudoku.length !== 0){
        setSudokuArray(storedPlaySudoku)
      }else{
        repeatIfFail()
      }
    }else{
      setSolvedStatus("Can't be solved")
    }
    getIsSolved(true)
    setTimeout(() =>{
      setSolveOnClick(false)
    },100)
  }
  const restartGame= () => {
    setRestartOnClick(true)
    setSudokuArray(new Array(9*9).fill(""))
    setStoredPlaySudoku([])
    setGameStarted(false)
    getIsSolved(false)
    setSolvedStatus("")
    setCheckAll(new Array(9*3).fill([...Array(9)].map((_, index)=>index + 1)))
    setTimeout(() =>{
      setRestartOnClick(false)
    },100)
  }

  return (
    <div className="flex justify-center items-center my-10 flex-col container mx-auto">
      <div className="flex"><h1 className="text-3xl font-bold">Sudoku </h1><span className="ml-4">{solvedStatus}</span></div>
      <div className="flex space-x-4 m-4">
        <div className="flex flex-col">
          <label>Difficulty</label>
          <select className="" value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}>
            <option value="4">Easy</option>  
            <option value="5">Medium</option>  
            <option value="6">Hard</option>  
          </select>
        </div>
        <button className={`px-3 py-1 border  rounded-lg ${gameSetterOnClick && 'bg-gray-200'} ${gameStarted ? "border-gray-300 text-gray-300" : "border-gray-700 text-gray-700"}`} disabled={gameStarted} onClick={setGame} >Set Game</button>
        <button className={`px-3 py-1 border border-gray-700 rounded-lg ${solveOnClick && 'bg-gray-200'} ${(!gameStarted || isSolved) ? "border-gray-300 text-gray-300" : "border-gray-700 text-gray-700"}`} onClick={solveGame} disabled={!gameStarted || isSolved}>Solve</button>
        <button className={`px-3 py-1 border border-gray-700 rounded-lg ${restartOnClick && 'bg-gray-200'} ${!gameStarted ? "border-gray-300 text-gray-300" : "border-gray-700 text-gray-700"}`} onClick={restartGame} disabled={!gameStarted}>Restart</button>
      </div>
      <div className={`flex w-[580px] flex-wrap border-2 border-gray-700`}>
        {sudokuArray.map((each, indx)=>each === "" ?
        <input disabled={!gameStarted} key={indx} className={`focus:bg-gray-300 outline-0 caret-transparent w-16 h-16 border p-6 text-2xl font-bold text-gray-600 ${gameStarted ? "cursor-pointer" :""} ${upperHorizontalLine.includes(indx) && "border-b-2 border-b-gray-700"} ${lowerHorizontalLine.includes(indx) && "border-t-2 border-t-gray-700"} ${leftVerticalLine.includes(indx) && "border-r-2 border-r-gray-700"} ${rightVerticalLine.includes(indx) && "border-l-2 border-l-gray-700"}`} value={each} type="text" onChange={({target})=>setSudokuArray(arr=> {
          if(target.value.match(checkIfInteger)){
            arr[indx] = Number(target.value)
            let deductArr = eachTracking[`${indx}`]
            for(let i = 0 ;i < deductArr.length ; i++){
              setCheckAll(()=>{
                checkAll[deductArr[i]] = checkAll[deductArr[i]].filter((e:number)=>{
                 return Number(e)!==Number(target.value)
                })
                return checkAll
              })
            }
          }
          return [...arr]
        })}/>
        :
        <div  key={indx} className={`w-16 h-16 border flex justify-center items-center text-2xl font-bold text-gray-600 ${upperHorizontalLine.includes(indx) && "border-b-2 border-b-gray-700"} ${lowerHorizontalLine.includes(indx) && "border-t-2 border-t-gray-700"} ${leftVerticalLine.includes(indx) && "border-r-2 border-r-gray-700"} ${rightVerticalLine.includes(indx) && "border-l-2 border-l-gray-700"}`}>{each}</div>)}
      </div>
    </div>
  );
}

export default App;
