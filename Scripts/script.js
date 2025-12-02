  let character;
  let selection = false;

  const CHARACTER_CLASS = ["Warrior", "Assassin", "Mage"]
  let characterHpList = [150, 100, 125]
  let characterAttackList = [10, 20, 15]
  let characterStrengthList = [15, 8, 12]
  let characterSelectionList =[
    "You have chosen the path of the fierce Warrior!",
    "You have chosen the fearsome Assassin!",
    "You have chosen the wise Mage!",
  ];

  let characterHp, characterAttack, characterStrength;
  let characterAttackDamage;
  let characterSpecial;
  let characterHeal;

  let cooldown = false;

  const BOSS_NAME = ["Duke", "The Count", "Dragon"]
  let bossHpList = [150, 125, 100]
  let bossAttackList = [15, 20, 25]
  let bossStrengthList = [10, 12, 15]
  let bossSpecialList = [30, 40, 50]
  let bossChargeList = [50, 75, 50]

  let bossRandom = Math.floor(Math.random() * BOSS_NAME.length);
  let bossName = BOSS_NAME[bossRandom];
  let bossHp = bossHpList[bossRandom];
  let bossAttack = bossAttackList[bossRandom];
  let bossStrength = bossStrengthList[bossRandom];
  let bossSpecial = bossSpecialList[bossRandom];
  let bossCharge = bossChargeList[bossRandom];

  let charging = false;
  let turn = 1;

  while (selection === false) {
    character = prompt(`Please choose your character class: The fierce "Warrior", the dangerous "Assassin", or the powerful "Mage"!`);
    if (character === null) {
      alert(`You have chosen to return home, perhaps you are brave enough next time!`);
      selection = true;
      break;
    }

    if (!/^[A-Za-z\s]+$/.test(character)) {
      alert(`Please enter letters.`);
      continue;
    }

    let characterSelection = character.toLowerCase();

    for (let i = 0; i < CHARACTER_CLASS.length; i++) {
      if (characterSelection === CHARACTER_CLASS[i].toLowerCase()) {
        characterHp = characterHpList[i];
        characterAttack = characterAttackList[i];
        characterStrength = characterStrengthList[i];
        alert(characterSelectionList[i]) //refers to the text in character selection array  
        selection = true;
        playerMaxHp = characterHp; // sets  max health
        break;
      }
    }
    if (selection === false) {
      alert(`Please choose your class, brave adventurer!`)
      continue;
    }
  }

  switch (character.toLowerCase()) { //change text and change to for loop
    case "warrior": 
      alert (`As the stoic ${character} passes through a dense forest, he hears the roar of the diabolical being known as the ${bossName}`)
      break;
    case "assassin":
      alert (`As the master ${character} passes through a dense forest, the he hears the roar of the diabolical being known as the ${bossName}`)
      break;
    case "mage":
      alert (`As the wise ${character} passes through a dense forest, the he hears the roar of the diabolical being known as the ${bossName}`)
      break;
  }

  while (characterHp > 0 && bossHp > 0) {
    alert(`Turn number ${turn}!`);

    let input = false; 
    let turnOption;
    let turnOptionInput;

    while (!input) { // validating input
      turnOption = prompt(`What will you do this turn? "Attack", "Special attack", or "Heal"`);

      if (turnOption === null) {
        alert(`You have fled from battlefield`);
        characterHp = 0;
        input = true;
        turnOptionInput = "abandon"
        break;
      }

      turnOptionInput = turnOption.toLowerCase();

      if (turnOptionInput === "attack" || turnOptionInput === "special attack" || turnOptionInput === "heal") {
        input = true; 
      } else {
        alert(`Choose your action, "Attack", "Special attack", or "Heal"`);
      }
    }

    if (turnOptionInput === "abandon") continue;

    if (cooldown) {
      alert("You are recovering from your special attack and cannot attack this turn!");
      cooldown = false;
    } else {
      switch (turnOptionInput) {
        case "attack": 
        characterAttackDamage = (characterAttack + Math.floor(Math.random() * 5) + characterStrength) - Math.floor(bossStrength / 2);
          break;
        case "special attack": 
        characterSpecial = characterAttack + Math.floor(Math.random() * 10 + characterStrength * 2);
          cooldown = true;
          break;
        case "heal": 
        characterHeal = Math.floor(Math.random() * 2+ (characterStrength / 2));
          break;
      }
    //add different texts for different characters , i.e Warrior swings his heavy blade... Mage shoots a brilliant fireball from his staff... etc 

      if (turnOptionInput === "special attack") { //After special attack, you cannot attack next turn (to be added)
        bossHp = bossHp - characterSpecial;
        bossHp = Math.max(bossHp, 0); // sets so that it cannot be reduced below 0
        alert(`You resorted to using your special attack, you inflicted ${characterSpecial} damage, the boss has ${bossHp} left!`)
        cooldown = true;
      } else if (turnOptionInput === "attack") {
        bossHp = bossHp - characterAttackDamage;
        bossHp = Math.max(bossHp, 0);
        switch (character) {
        case "warrior":
          alert(`You swing your heavy blade at the ${bossName}, and dealt ${characterAttackDamage}! It has ${bossHp}`)
          break;
        case "assassin":
          alert(`You unleash a flurry of slashes with your daggers, and dealt ${characterAttackDamage}! Your foe has ${bossHp} left!`)
          break;
        case "mage":
          alert(`You blast the foe with a powerful fireball, dealing ${characterAttackDamage}! The abomination has ${bossHp} left!`)
          break;
        }
        } else if (turnOptionInput === "heal") {
          if (characterHp === playerMaxHp) {
            alert(`You cannot exceed your max hitpoints`);
        } else {
            characterHeal = Math.floor(Math.random() * 2 + (characterStrength / 2)); // recalc here
            characterHp = Math.min(characterHp + characterHeal, playerMaxHp); 
            alert(`You take a sip of your potion, you heal for ${characterHeal}. Your hp is now ${characterHp}.`);
        }
      }
    }

    //bossHp = bossHp - characterAttackDamage
    if (bossHp <= 0) {
      bossHp = 0;
      alert(`You have defeated the mighty ${bossName}!`);
      break;
    }

    let bossTurn = Math.floor(Math.random() * 10) + 1;
    let bossAttackDamage = bossAttack + Math.floor(Math.random() * bossStrength - (characterStrength / 2));
    let bossSpecialDamage = bossSpecial + Math.floor(Math.random() * bossStrength - (characterStrength / 2));
    let bossChargeDamage = bossCharge + Math.floor(Math.random() * bossStrength - (characterStrength / 2));

    if (charging) {
      charging = false; 
      characterHp = Math.max(characterHp - bossChargeDamage, 0);
      alert(`${bossName} unleashes its devastating charged attack for ${bossChargeDamage}! You have ${characterHp} left!`);

      if (characterHp <= 0) break;
        continue;
    }
    
    if (bossTurn <= 7) {
      characterHp = characterHp - bossAttackDamage
      characterHp = Math.max(characterHp, 0);
      alert(`${bossName} swipes at you and deals ${bossAttackDamage}, you have ${characterHp} remaining!`)
    } else if (bossTurn > 7 && bossTurn < 10) {
      characterHp = characterHp - bossSpecialDamage
      characterHp = Math.max(characterHp, 0);
      alert(`${bossName} launches a volley of venom spit dealing ${bossSpecialDamage}, you have ${characterHp} remaining!`)
    } else {    
      charging = true;
      alert(`${bossName} begins charging a devastating attack...`);
    }

    //characterHp = characterHp - bossDamage
    if (characterHp <= 0) {
      characterHp = 0;
      alert(`Alas brave adventurer, you have learnt why the ${bossName} was so feared`);
      break;
    }

    turn++;
  }


/* 
next steps:

Add routes, i.e turn left, or go into the dark forest.
Add mini fights, between the start and the boss fight.
Possibly add loot, for example, a stronger weapon for each class which adds damage.
Would like to add a summoner/necromancer with different mechanics.
Spice up the text

Add basic visualizaion, images + functioning health bar

Add tick based system IF visualization is working.*/