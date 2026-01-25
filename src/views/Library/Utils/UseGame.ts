// <template>
//     <div class="grid grid-cols-2">
//         <div>
//             <strong>
//                 {{ fighter.name }}
//             </strong>
//             <div><strong>HP:</strong> {{ fighter.health }}/{{ fighter.maxHealth }}</div>
//             <div><strong>Armor:</strong> {{ fighter.armor }}</div>
//             <div><strong>DamageDie:</strong> {{ fighter.damageDie }}</div>
//             <div class="m-1">
//                 <button @click="attack(fighter, knight)" class="gray-2 p-3 border-1 rounded">
//                     Атаковать knight
//                 </button>
//             </div>
//             <div class="m-1">
//                 <button @click="reset(fighter, knight)" class="gray-2 p-3 border-1 rounded">
//                     Восстановить всё
//                 </button>
//             </div>
//         </div>
//         <div>
//             <strong>
//                 {{ knight.name }}
//             </strong>
//             <div><strong>HP:</strong> {{ knight.health }}/{{ knight.maxHealth }}</div>
//             <div><strong>Armor:</strong> {{ knight.armor }}</div>
//             <div><strong>DamageDie:</strong> {{ knight.damageDie }}</div>
//         </div>
//         <div>
//             <div><strong>Побед: </strong> {{ heroWin }}</div>
//             <div><strong>Поражений: </strong> {{ heroLose }}</div>
//             <div><strong>Ничьи: </strong> {{ draw }}</div>
//             <div><strong>Winrate: </strong> {{ heroWin / heroLose }}</div>
//             <button @click="attackMany(10000, fighter, knight)" class="gray-2 p-3 border-1 rounded">
//                 1000 Боёв
//             </button>
//         </div>
//     </div>
// </template>

// <script setup lang="ts">
// import { reactive, ref } from 'vue'

// const rollDice = (max: number): number => {
//     const result = Math.floor(Math.random() * max) + 1
//     // console.log(result, '/', max)
//     return result
// }

// class Character {
//     armor: number
//     maxHealth: number

//     constructor(
//         public name: string,
//         public damageDie: number,
//         public attackBonus: number,
//         public health: number,
//     ) {
//         this.armor = 0
//         this.maxHealth = health
//     }
//     getDamage(damage: number): void {
//         this.health = Math.max(0, this.health - Math.max(0, damage - this.armor))
//     }
//     attack(monster: Character): number {
//         const result = rollDice(6) + rollDice(6) + this.attackBonus
//         console.log(this.name, 'атакует', monster.name, ' Результат:', result)
//         if (result > 6) {
//             const dmg = rollDice(this.damageDie)
//             console.log(this.name, `попадает и наносит ${dmg} урона`)

//             monster.getDamage(dmg)
//         }
//         if (result <= 10) {
//             const dmg = rollDice(monster.damageDie)
//             console.log(this.name, `получает ${dmg} урон`)
//             this.getDamage(dmg)
//         }
//         return 0
//     }

//     reset(): void {
//         this.health = this.maxHealth
//     }
// }
// // heroes
// const fighter = reactive(new Character('Fighter', 10, 3, 11))
// fighter.armor = 1

// // monsters
// const knight = reactive(new Character('Knight', 20, 0, 12))
// knight.armor = 4

// const bandidt = reactive(new Character('Bandidt', 6, 0, 3))
// bandidt.armor = 1

// const guard = reactive(new Character('Guard', 8, 0, 8))
// guard.armor = 1

// // методы
// const attack = (hero: Character, monster: Character) => {
//     hero.attack(monster)
// }

// const reset = (...characters: Character[]) => {
//     characters.forEach((char) => char.reset())
// }

// // тест баланса
// const heroWin = ref(0)
// const heroLose = ref(0)
// const draw = ref(0)

// const attackMany = (n: number, hero: Character = fighter, enemy: Character = knight) => {
//     for (let i = 0; i < n; i++) {
//         while (enemy.health > 0 && hero.health > 0) {
//             hero.attack(enemy)
//         }
//         if (enemy.health === 0 && hero.health === 0) draw.value++
//         else if (enemy.health === 0) heroWin.value++
//         else heroLose.value++
//         reset(hero, enemy)
//     }
// }
// </script>
