import { menuAuth } from "./menu/MenuAuth";
import { namePrincipal } from "./menu/MenuPrincipal";

async function main() {
    const usuario = await menuAuth();

    if(usuario){
        await namePrincipal();
    }
}

main();