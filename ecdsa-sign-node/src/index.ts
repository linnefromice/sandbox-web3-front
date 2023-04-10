const main = async () => {
  console.log("Main")
}

main()
  .then(_ => console.log("Finished!!"))
  .catch(_ => console.log("Error!!"))