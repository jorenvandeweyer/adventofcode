const after = "580741";
const recipes = [3, 7];
const length = 10;

function main() {
    let elf1= 0;
    let elf2= 1;

    while(!recipes.slice(recipes.length-20, recipes.length-1).join("").includes(after)) {
        let recipe = recipes[elf1] + recipes[elf2];
        recipes.push(...recipe.toString().split("").map(num => parseInt(num)));
        elf1 += recipes[elf1]+1;
        elf2 += recipes[elf2]+1;
        if (elf1 >= recipes.length) elf1%=recipes.length;
        if (elf2 >= recipes.length) elf2%=recipes.length;
    }
    console.log(recipes.join("").indexOf(after));

    // console.log(recipes.slice(after, after+length).join(""));
}

main();
