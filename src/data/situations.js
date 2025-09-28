// Banque de situations étendue pour La Famille Déboussolée
// Situations réalistes organisées par catégorie et niveau de difficulté

export const SITUATIONS_DATABASE = {
  'Liberté': {
    'easy': [
      {
        id: 'L1',
        title: 'Soirée pyjama',
        situation: "Léo veut garder son smartphone sous l'oreiller pour chatter avec ses amis jusqu'à minuit. Ses parents veulent qu'il l'éteigne.",
        choices: [
          { label: 'A', text: 'Léo garde son smartphone, il veut sa liberté.', value: 'Liberté' },
          { label: 'B', text: "Il accepte de l'éteindre pour rassurer ses parents.", value: 'Sécurité' },
          { label: 'C', text: 'Il propose de négocier : seulement le vendredi soir.', value: 'Règles' },
        ],
      },
      {
        id: 'L2',
        title: 'Weekend (Liberté vs Famille)',
        situation: 'Julie veut passer la matinée sur TikTok, ses parents lui proposent une balade.',
        choices: [
          { label: 'A', text: 'Elle reste sur TikTok.', value: 'Liberté' },
          { label: 'B', text: 'Elle part avec sa famille pour passer du temps ensemble.', value: 'Cœur' },
          { label: 'C', text: 'Elle propose : TikTok 1h, puis la balade.', value: 'Règles' },
        ],
      },
      {
        id: 'L3',
        title: 'Choix vestimentaire',
        situation: "Emma veut porter un short très court à l'école, mais ses parents trouvent que ce n'est pas approprié.",
        choices: [
          { label: 'A', text: "Elle porte ce qu'elle veut, c'est son corps.", value: 'Liberté' },
          { label: 'B', text: 'Elle choisit un autre vêtement pour faire plaisir à ses parents.', value: 'Cœur' },
          { label: 'C', text: 'Elle négocie : short plus long mais toujours à la mode.', value: 'Règles' },
        ],
      },
      {
        id: 'L4',
        title: 'Heure de coucher',
        situation: "Tom veut regarder un film qui finit à 23h, mais ses parents ont fixé l'heure de coucher à 22h.",
        choices: [
          { label: 'A', text: 'Il regarde le film quand même, il est assez grand.', value: 'Liberté' },
          { label: 'B', text: 'Il respecte l\'heure de coucher pour ne pas inquiéter ses parents.', value: 'Sécurité' },
          { label: 'C', text: 'Il propose de regarder le film le week-end.', value: 'Règles' },
        ],
      },
      {
        id: 'L5',
        title: 'Sortie entre amis',
        situation: "Sarah veut aller au cinéma avec ses amis, mais ses parents veulent qu'elle reste à la maison pour étudier.",
        choices: [
          { label: 'A', text: 'Elle sort quand même, elle a le droit de s\'amuser.', value: 'Liberté' },
          { label: 'B', text: 'Elle reste à la maison pour ne pas décevoir ses parents.', value: 'Cœur' },
          { label: 'C', text: 'Elle propose de sortir après avoir fini ses devoirs.', value: 'Règles' },
        ],
      }
    ],
    'medium': [
      {
        id: 'L6',
        title: 'Compte social interdit',
        situation: "Alex veut créer un compte Instagram mais n'a que 12 ans. Ses parents refusent catégoriquement.",
        choices: [
          { label: 'A', text: 'Il crée le compte en secret, il est assez mature.', value: 'Liberté' },
          { label: 'B', text: 'Il respecte la décision de ses parents et attend.', value: 'Sécurité' },
          { label: 'C', text: 'Il propose un compte surveillé par ses parents.', value: 'Règles' },
        ],
      },
      {
        id: 'L7',
        title: 'Contrôle parental',
        situation: "Les parents de Maya installent un contrôle parental sur son téléphone sans la prévenir.",
        choices: [
          { label: 'A', text: 'Elle proteste, c\'est une violation de sa vie privée.', value: 'Liberté' },
          { label: 'B', text: 'Elle accepte, ses parents veulent la protéger.', value: 'Sécurité' },
          { label: 'C', text: 'Elle demande à en discuter et négocier les paramètres.', value: 'Règles' },
        ],
      },
      {
        id: 'L8',
        title: 'Orientation scolaire',
        situation: "Lucas veut faire des études d'art mais ses parents préfèrent qu'il fasse médecine.",
        choices: [
          { label: 'A', text: 'Il choisit l\'art, c\'est sa vie et ses rêves.', value: 'Liberté' },
          { label: 'B', text: 'Il choisit médecine pour faire plaisir à ses parents.', value: 'Cœur' },
          { label: 'C', text: 'Il propose de faire les deux : médecine et art en parallèle.', value: 'Règles' },
        ],
      },
      {
        id: 'L9',
        title: 'Relation amoureuse',
        situation: "Emma a 14 ans et veut sortir avec un garçon de 17 ans. Ses parents s'opposent à cette relation.",
        choices: [
          { label: 'A', text: 'Elle sort avec lui en secret, elle est assez mature.', value: 'Liberté' },
          { label: 'B', text: 'Elle renonce à la relation pour respecter ses parents.', value: 'Sécurité' },
          { label: 'C', text: 'Elle propose qu\'ils se rencontrent d\'abord en groupe.', value: 'Règles' },
        ],
      },
      {
        id: 'L10',
        title: 'Argent de poche',
        situation: "Tom veut dépenser tout son argent de poche en jeux vidéo, mais ses parents veulent qu'il épargne.",
        choices: [
          { label: 'A', text: 'Il dépense son argent comme il veut, c\'est le sien.', value: 'Liberté' },
          { label: 'B', text: 'Il épargne pour ne pas décevoir ses parents.', value: 'Cœur' },
          { label: 'C', text: 'Il propose de dépenser la moitié et épargner l\'autre.', value: 'Règles' },
        ],
      }
    ],
    'hard': [
      {
        id: 'L11',
        title: 'Dénonciation familiale',
        situation: "Sophie découvre que son oncle a des comportements inappropriés avec sa cousine. Elle veut le dénoncer mais sa famille lui demande de garder le silence.",
        choices: [
          { label: 'A', text: 'Elle dénonce quand même, la sécurité prime sur la famille.', value: 'Liberté' },
          { label: 'B', text: 'Elle garde le silence pour préserver l\'unité familiale.', value: 'Cœur' },
          { label: 'C', text: 'Elle cherche des conseils auprès d\'un adulte de confiance.', value: 'Règles' },
        ],
      },
      {
        id: 'L12',
        title: 'Refus de traitement',
        situation: "Les parents de Max refusent un traitement médical nécessaire pour des raisons religieuses. Max veut être soigné.",
        choices: [
          { label: 'A', text: 'Il cherche de l\'aide médicale sans l\'accord de ses parents.', value: 'Liberté' },
          { label: 'B', text: 'Il respecte les croyances de ses parents même si ça le met en danger.', value: 'Cœur' },
          { label: 'C', text: 'Il essaie de convaincre ses parents avec des arguments médicaux.', value: 'Règles' },
        ],
      },
      {
        id: 'L13',
        title: 'Orientation sexuelle',
        situation: "Alex se rend compte qu'il est gay, mais ses parents ont des opinions homophobes. Il veut leur en parler.",
        choices: [
          { label: 'A', text: 'Il leur dit quand même, il a le droit d\'être lui-même.', value: 'Liberté' },
          { label: 'B', text: 'Il cache sa sexualité pour ne pas blesser ses parents.', value: 'Cœur' },
          { label: 'C', text: 'Il attend d\'être plus âgé et indépendant pour leur en parler.', value: 'Règles' },
        ],
      },
      {
        id: 'L14',
        title: 'Violence domestique',
        situation: "Emma voit son père battre sa mère. Elle veut appeler la police mais sa mère lui demande de ne rien dire.",
        choices: [
          { label: 'A', text: 'Elle appelle la police quand même, la violence doit cesser.', value: 'Liberté' },
          { label: 'B', text: 'Elle garde le silence pour protéger sa mère.', value: 'Cœur' },
          { label: 'C', text: 'Elle cherche de l\'aide auprès d\'un adulte de confiance.', value: 'Règles' },
        ],
      },
      {
        id: 'L15',
        title: 'Exploitation familiale',
        situation: "Tom découvre que ses parents l'utilisent pour commettre des fraudes. Il veut arrêter mais ils le menacent.",
        choices: [
          { label: 'A', text: 'Il dénonce ses parents, il ne veut pas participer à des crimes.', value: 'Liberté' },
          { label: 'B', text: 'Il continue pour protéger sa famille.', value: 'Cœur' },
          { label: 'C', text: 'Il cherche de l\'aide juridique pour sortir de cette situation.', value: 'Règles' },
        ],
      }
    ]
  },
  'Cœur': {
    'easy': [
      {
        id: 'C1',
        title: 'Repas silencieux',
        situation: 'Pendant le dîner, chaque membre de la famille a son smartphone en main. Personne ne se parle.',
        choices: [
          { label: 'A', text: 'Continuer comme ça, chacun fait ce qu\'il veut.', value: 'Liberté' },
          { label: 'B', text: 'Poser les téléphones et discuter ensemble.', value: 'Cœur' },
          { label: 'C', text: 'Instaurer une règle "zéro téléphone à table".', value: 'Règles' },
        ],
      },
      {
        id: 'C2',
        title: 'Ami absent (émotion)',
        situation: 'Emma envoie plein de messages à son amie qui ne répond pas. Elle se sent rejetée.',
        choices: [
          { label: 'A', text: 'Elle continue à écrire jusqu\'à obtenir une réponse.', value: 'Liberté' },
          { label: 'B', text: 'Elle patiente, son amie doit être occupée.', value: 'Sécurité' },
          { label: 'C', text: 'Elle parle de son ressenti à ses parents.', value: 'Cœur' },
        ],
      },
      {
        id: 'C3',
        title: 'Conflit entre frères',
        situation: 'Lucas et sa sœur se disputent pour l\'utilisation de la console. Ils sont tous les deux en colère.',
        choices: [
          { label: 'A', text: 'Chacun joue quand il veut, pas de règles.', value: 'Liberté' },
          { label: 'B', text: 'Ils se réconcilient et jouent ensemble.', value: 'Cœur' },
          { label: 'C', text: 'Ils établissent un planning équitable.', value: 'Règles' },
        ],
      },
      {
        id: 'C4',
        title: 'Parents tristes',
        situation: 'Tom remarque que ses parents sont tristes depuis quelques jours. Il ne sait pas pourquoi.',
        choices: [
          { label: 'A', text: 'Il ne dit rien, ce n\'est pas son problème.', value: 'Liberté' },
          { label: 'B', text: 'Il leur demande s\'ils vont bien et les réconforte.', value: 'Cœur' },
          { label: 'C', text: 'Il essaie de comprendre en observant leur comportement.', value: 'Règles' },
        ],
      },
      {
        id: 'C5',
        title: 'Ami en difficulté',
        situation: 'Sarah apprend que son meilleur ami a des problèmes familiaux. Il semble très triste.',
        choices: [
          { label: 'A', text: 'Elle ne s\'en mêle pas, c\'est sa vie privée.', value: 'Liberté' },
          { label: 'B', text: 'Elle lui propose son soutien et l\'écoute.', value: 'Cœur' },
          { label: 'C', text: 'Elle en parle à un adulte de confiance.', value: 'Règles' },
        ],
      }
    ],
    'medium': [
      {
        id: 'C6',
        title: 'Divorce des parents',
        situation: 'Les parents d\'Alex annoncent leur divorce. Il se sent perdu et ne sait pas comment réagir.',
        choices: [
          { label: 'A', text: 'Il se concentre sur sa vie et ignore la situation.', value: 'Liberté' },
          { label: 'B', text: 'Il exprime ses sentiments et cherche du réconfort.', value: 'Cœur' },
          { label: 'C', text: 'Il essaie de comprendre les raisons du divorce.', value: 'Règles' },
        ],
      },
      {
        id: 'C7',
        title: 'Harcèlement scolaire',
        situation: 'Emma est harcelée à l\'école. Elle ne veut pas en parler à ses parents pour ne pas les inquiéter.',
        choices: [
          { label: 'A', text: 'Elle gère seule, c\'est son problème.', value: 'Liberté' },
          { label: 'B', text: 'Elle en parle à ses parents pour avoir du soutien.', value: 'Cœur' },
          { label: 'C', text: 'Elle cherche de l\'aide auprès des professeurs.', value: 'Règles' },
        ],
      },
      {
        id: 'C8',
        title: 'Maladie d\'un proche',
        situation: 'Le grand-père de Tom est gravement malade. Toute la famille est triste et inquiète.',
        choices: [
          { label: 'A', text: 'Il évite le sujet, c\'est trop difficile à gérer.', value: 'Liberté' },
          { label: 'B', text: 'Il passe du temps avec son grand-père et sa famille.', value: 'Cœur' },
          { label: 'C', text: 'Il cherche des informations sur la maladie pour comprendre.', value: 'Règles' },
        ],
      },
      {
        id: 'C9',
        title: 'Trahison d\'un ami',
        situation: 'Lucas découvre que son meilleur ami a répété ses secrets à d\'autres personnes.',
        choices: [
          { label: 'A', text: 'Il coupe les ponts, il ne peut plus lui faire confiance.', value: 'Liberté' },
          { label: 'B', text: 'Il lui pardonne et essaie de reconstruire leur amitié.', value: 'Cœur' },
          { label: 'C', text: 'Il lui explique pourquoi c\'est blessant et attend des excuses.', value: 'Règles' },
        ],
      },
      {
        id: 'C10',
        title: 'Problèmes financiers',
        situation: 'Les parents d\'Emma ont des difficultés financières. Ils essaient de cacher la situation.',
        choices: [
          { label: 'A', text: 'Elle fait comme si de rien n\'était, ce n\'est pas son problème.', value: 'Liberté' },
          { label: 'B', text: 'Elle propose d\'aider en réduisant ses dépenses.', value: 'Cœur' },
          { label: 'C', text: 'Elle essaie de comprendre la situation pour mieux aider.', value: 'Règles' },
        ],
      }
    ],
    'hard': [
      {
        id: 'C11',
        title: 'Abus dans la famille',
        situation: 'Sophie découvre qu\'un membre de sa famille abuse d\'un enfant. Elle ne sait pas quoi faire.',
        choices: [
          { label: 'A', text: 'Elle dénonce immédiatement, la sécurité de l\'enfant prime.', value: 'Liberté' },
          { label: 'B', text: 'Elle essaie de protéger l\'enfant en gardant le silence.', value: 'Cœur' },
          { label: 'C', text: 'Elle cherche de l\'aide professionnelle pour gérer la situation.', value: 'Règles' },
        ],
      },
      {
        id: 'C12',
        title: 'Suicide d\'un proche',
        situation: 'Un ami de Max s\'est suicidé. Il se sent coupable de ne pas avoir vu les signes.',
        choices: [
          { label: 'A', text: 'Il évite d\'y penser, c\'est trop douloureux.', value: 'Liberté' },
          { label: 'B', text: 'Il exprime sa douleur et cherche du réconfort.', value: 'Cœur' },
          { label: 'C', text: 'Il cherche de l\'aide psychologique pour comprendre.', value: 'Règles' },
        ],
      },
      {
        id: 'C13',
        title: 'Violence domestique',
        situation: 'Emma voit son père battre sa mère. Elle veut aider mais ne sait pas comment.',
        choices: [
          { label: 'A', text: 'Elle intervient directement pour arrêter la violence.', value: 'Liberté' },
          { label: 'B', text: 'Elle console sa mère et la soutient.', value: 'Cœur' },
          { label: 'C', text: 'Elle appelle la police et cherche de l\'aide professionnelle.', value: 'Règles' },
        ],
      },
      {
        id: 'C14',
        title: 'Addiction familiale',
        situation: 'Tom découvre que son père a une addiction à l\'alcool. Il ne sait pas comment l\'aider.',
        choices: [
          { label: 'A', text: 'Il ne s\'en mêle pas, c\'est le problème de son père.', value: 'Liberté' },
          { label: 'B', text: 'Il essaie de le soutenir et de l\'encourager à se soigner.', value: 'Cœur' },
          { label: 'C', text: 'Il cherche de l\'aide professionnelle pour sa famille.', value: 'Règles' },
        ],
      },
      {
        id: 'C15',
        title: 'Discrimination familiale',
        situation: 'Alex découvre que ses parents ont des opinions racistes. Il est choqué et ne sait pas comment réagir.',
        choices: [
          { label: 'A', text: 'Il les confronte directement sur leurs préjugés.', value: 'Liberté' },
          { label: 'B', text: 'Il essaie de les comprendre et de les éduquer.', value: 'Cœur' },
          { label: 'C', text: 'Il cherche des ressources pour les aider à évoluer.', value: 'Règles' },
        ],
      }
    ]
  },
  'Règles': {
    'easy': [
      {
        id: 'R1',
        title: 'Durée d\'écran',
        situation: 'Les parents annoncent "2h d\'écran max par jour". Les ados trouvent ça injuste.',
        choices: [
          { label: 'A', text: 'Respecter la règle même si ça frustre.', value: 'Règles' },
          { label: 'B', text: 'Proposer une négociation : plus le week-end, moins la semaine.', value: 'Liberté' },
          { label: 'C', text: 'Accepter la limite parce que ça protège la santé.', value: 'Sécurité' },
        ],
      },
      {
        id: 'R2',
        title: 'Contrôle parental',
        situation: 'Les parents vérifient les messages de Jade sans prévenir.',
        choices: [
          { label: 'A', text: 'Jade accepte, ses parents veulent la protéger.', value: 'Sécurité' },
          { label: 'B', text: 'Jade proteste, c\'est son espace privé.', value: 'Liberté' },
          { label: 'C', text: 'Jade propose qu\'ils en parlent ensemble.', value: 'Règles' },
        ],
      },
      {
        id: 'R3',
        title: 'Heure de coucher',
        situation: 'Les parents fixent une heure de coucher stricte, mais les enfants veulent rester debout plus tard.',
        choices: [
          { label: 'A', text: 'Respecter l\'heure même si c\'est frustrant.', value: 'Règles' },
          { label: 'B', text: 'Négocier des heures différentes selon l\'âge.', value: 'Liberté' },
          { label: 'C', text: 'Accepter car c\'est important pour la santé.', value: 'Sécurité' },
        ],
      },
      {
        id: 'R4',
        title: 'Tâches ménagères',
        situation: 'Les parents imposent des tâches ménagères, mais les enfants trouvent ça injuste.',
        choices: [
          { label: 'A', text: 'Faire les tâches même si c\'est pénible.', value: 'Règles' },
          { label: 'B', text: 'Proposer un système de récompenses.', value: 'Liberté' },
          { label: 'C', text: 'Accepter car c\'est normal de participer.', value: 'Cœur' },
        ],
      },
      {
        id: 'R5',
        title: 'Sorties entre amis',
        situation: 'Les parents demandent toujours où vont les enfants, mais ceux-ci trouvent ça trop strict.',
        choices: [
          { label: 'A', text: 'Respecter la règle même si c\'est gênant.', value: 'Règles' },
          { label: 'B', text: 'Négocier : dire où on va mais pas avec qui.', value: 'Liberté' },
          { label: 'C', text: 'Accepter car c\'est pour notre sécurité.', value: 'Sécurité' },
        ],
      }
    ],
    'medium': [
      {
        id: 'R6',
        title: 'Règles différentes selon l\'âge',
        situation: 'Les parents ont des règles différentes pour les enfants selon leur âge, mais les plus jeunes trouvent ça injuste.',
        choices: [
          { label: 'A', text: 'Accepter les différences car c\'est normal.', value: 'Règles' },
          { label: 'B', text: 'Demander des règles plus équitables.', value: 'Liberté' },
          { label: 'C', text: 'Comprendre que c\'est pour notre bien.', value: 'Sécurité' },
        ],
      },
      {
        id: 'R7',
        title: 'Règles religieuses',
        situation: 'Les parents imposent des règles religieuses, mais les enfants ne partagent pas la même foi.',
        choices: [
          { label: 'A', text: 'Respecter les règles même si on n\'y croit pas.', value: 'Règles' },
          { label: 'B', text: 'Exprimer ses doutes et négocier.', value: 'Liberté' },
          { label: 'C', text: 'Accepter pour respecter les croyances familiales.', value: 'Cœur' },
        ],
      },
      {
        id: 'R8',
        title: 'Règles de sécurité',
        situation: 'Les parents imposent des règles de sécurité strictes, mais les enfants trouvent ça excessif.',
        choices: [
          { label: 'A', text: 'Respecter même si on trouve ça excessif.', value: 'Règles' },
          { label: 'B', text: 'Discuter pour trouver un équilibre.', value: 'Liberté' },
          { label: 'C', text: 'Accepter car c\'est pour notre protection.', value: 'Sécurité' },
        ],
      },
      {
        id: 'R9',
        title: 'Règles d\'argent',
        situation: 'Les parents contrôlent strictement l\'argent de poche, mais les enfants veulent plus d\'autonomie.',
        choices: [
          { label: 'A', text: 'Accepter le contrôle même si c\'est frustrant.', value: 'Règles' },
          { label: 'B', text: 'Demander plus d\'autonomie financière.', value: 'Liberté' },
          { label: 'C', text: 'Comprendre que c\'est pour nous éduquer.', value: 'Sécurité' },
        ],
      },
      {
        id: 'R10',
        title: 'Règles de politesse',
        situation: 'Les parents imposent des règles de politesse strictes, mais les enfants trouvent ça dépassé.',
        choices: [
          { label: 'A', text: 'Respecter les règles même si on trouve ça dépassé.', value: 'Règles' },
          { label: 'B', text: 'Adapter les règles à notre époque.', value: 'Liberté' },
          { label: 'C', text: 'Accepter car c\'est important pour le respect.', value: 'Cœur' },
        ],
      }
    ],
    'hard': [
      {
        id: 'R11',
        title: 'Règles discriminatoires',
        situation: 'Les parents imposent des règles différentes selon le genre, mais les enfants trouvent ça injuste.',
        choices: [
          { label: 'A', text: 'Respecter même si on trouve ça discriminatoire.', value: 'Règles' },
          { label: 'B', text: 'Contester ces règles discriminatoires.', value: 'Liberté' },
          { label: 'C', text: 'Essayer de comprendre et éduquer les parents.', value: 'Cœur' },
        ],
      },
      {
        id: 'R12',
        title: 'Règles violentes',
        situation: 'Les parents utilisent la violence pour faire respecter les règles, mais les enfants ont peur.',
        choices: [
          { label: 'A', text: 'Obéir par peur de la violence.', value: 'Règles' },
          { label: 'B', text: 'Refuser la violence et chercher de l\'aide.', value: 'Liberté' },
          { label: 'C', text: 'Essayer de calmer la situation.', value: 'Sécurité' },
        ],
      },
      {
        id: 'R13',
        title: 'Règles illégales',
        situation: 'Les parents imposent des règles qui vont à l\'encontre de la loi, mais les enfants ne savent pas quoi faire.',
        choices: [
          { label: 'A', text: 'Respecter même si c\'est illégal.', value: 'Règles' },
          { label: 'B', text: 'Refuser et chercher de l\'aide juridique.', value: 'Liberté' },
          { label: 'C', text: 'Essayer de convaincre les parents de respecter la loi.', value: 'Sécurité' },
        ],
      },
      {
        id: 'R14',
        title: 'Règles sectaires',
        situation: 'Les parents imposent des règles d\'une secte, mais les enfants veulent s\'en échapper.',
        choices: [
          { label: 'A', text: 'Respecter même si on ne croit pas.', value: 'Règles' },
          { label: 'B', text: 'Refuser et chercher de l\'aide pour s\'échapper.', value: 'Liberté' },
          { label: 'C', text: 'Essayer de convaincre les parents de quitter la secte.', value: 'Cœur' },
        ],
      },
      {
        id: 'R15',
        title: 'Règles d\'exploitation',
        situation: 'Les parents imposent des règles qui exploitent les enfants, mais ceux-ci ne savent pas comment réagir.',
        choices: [
          { label: 'A', text: 'Respecter même si on se sent exploité.', value: 'Règles' },
          { label: 'B', text: 'Refuser et chercher de l\'aide pour se protéger.', value: 'Liberté' },
          { label: 'C', text: 'Essayer de négocier des conditions plus équitables.', value: 'Sécurité' },
        ],
      }
    ]
  },
  'Sécurité': {
    'easy': [
      {
        id: 'S1',
        title: 'Mot de passe',
        situation: 'Chloé donne son code à sa meilleure amie "par confiance".',
        choices: [
          { label: 'A', text: 'Elle garde ce geste, c\'est normal entre amies.', value: 'Cœur' },
          { label: 'B', text: 'Elle comprend que c\'est risqué et change son mot de passe.', value: 'Sécurité' },
          { label: 'C', text: 'Elle décide qu\'elle a le droit de partager ce qu\'elle veut.', value: 'Liberté' },
        ],
      },
      {
        id: 'S2',
        title: 'Photo gênante',
        situation: 'Un copain demande à Clara une photo qu\'elle n\'a pas envie d\'envoyer.',
        choices: [
          { label: 'A', text: 'Elle l\'envoie pour faire plaisir.', value: 'Cœur' },
          { label: 'B', text: 'Elle refuse et bloque le copain.', value: 'Sécurité' },
          { label: 'C', text: 'Elle dit qu\'elle fera comme elle veut, personne ne décide à sa place.', value: 'Liberté' },
        ],
      },
      {
        id: 'S3',
        title: 'Rencontre en ligne',
        situation: 'Un inconnu propose à Tom de se rencontrer dans un parc.',
        choices: [
          { label: 'A', text: 'Il accepte, il a envie de faire de nouveaux amis.', value: 'Cœur' },
          { label: 'B', text: 'Il refuse et bloque la personne.', value: 'Sécurité' },
          { label: 'C', text: 'Il décide seul, c\'est sa vie.', value: 'Liberté' },
        ],
      },
      {
        id: 'S4',
        title: 'Informations personnelles',
        situation: 'Un site demande à Emma ses informations personnelles pour un jeu.',
        choices: [
          { label: 'A', text: 'Elle les donne pour pouvoir jouer.', value: 'Cœur' },
          { label: 'B', text: 'Elle refuse et cherche un autre jeu.', value: 'Sécurité' },
          { label: 'C', text: 'Elle décide seule de ce qu\'elle partage.', value: 'Liberté' },
        ],
      },
      {
        id: 'S5',
        title: 'Message suspect',
        situation: 'Lucas reçoit un message étrange d\'un numéro inconnu.',
        choices: [
          { label: 'A', text: 'Il répond par curiosité.', value: 'Cœur' },
          { label: 'B', text: 'Il ignore et bloque le numéro.', value: 'Sécurité' },
          { label: 'C', text: 'Il décide seul de ce qu\'il fait.', value: 'Liberté' },
        ],
      }
    ],
    'medium': [
      {
        id: 'S6',
        title: 'Harcèlement en ligne',
        situation: 'Sarah est harcelée sur les réseaux sociaux par des inconnus.',
        choices: [
          { label: 'A', text: 'Elle ignore et espère que ça s\'arrêtera.', value: 'Cœur' },
          { label: 'B', text: 'Elle bloque, signale et en parle à un adulte.', value: 'Sécurité' },
          { label: 'C', text: 'Elle gère seule, c\'est son problème.', value: 'Liberté' },
        ],
      },
      {
        id: 'S7',
        title: 'Chantage en ligne',
        situation: 'Alex reçoit des menaces de quelqu\'un qui a ses photos privées.',
        choices: [
          { label: 'A', text: 'Il cède aux menaces pour éviter les problèmes.', value: 'Cœur' },
          { label: 'B', text: 'Il refuse et cherche de l\'aide immédiatement.', value: 'Sécurité' },
          { label: 'C', text: 'Il négocie seul avec le chanteur.', value: 'Liberté' },
        ],
      },
      {
        id: 'S8',
        title: 'Fraude en ligne',
        situation: 'Tom reçoit un message lui proposant de gagner de l\'argent facilement.',
        choices: [
          { label: 'A', text: 'Il essaie par curiosité.', value: 'Cœur' },
          { label: 'B', text: 'Il refuse et bloque le contact.', value: 'Sécurité' },
          { label: 'C', text: 'Il décide seul de ce qu\'il fait.', value: 'Liberté' },
        ],
      },
      {
        id: 'S9',
        title: 'Exploitation en ligne',
        situation: 'Emma découvre qu\'un adulte essaie de la manipuler en ligne.',
        choices: [
          { label: 'A', text: 'Elle essaie de comprendre ses intentions.', value: 'Cœur' },
          { label: 'B', text: 'Elle bloque immédiatement et en parle à un adulte.', value: 'Sécurité' },
          { label: 'C', text: 'Elle gère seule la situation.', value: 'Liberté' },
        ],
      },
      {
        id: 'S10',
        title: 'Discrimination en ligne',
        situation: 'Lucas est victime de discrimination sur un forum en ligne.',
        choices: [
          { label: 'A', text: 'Il essaie de comprendre et de dialoguer.', value: 'Cœur' },
          { label: 'B', text: 'Il signale et bloque les utilisateurs.', value: 'Sécurité' },
          { label: 'C', text: 'Il gère seul la situation.', value: 'Liberté' },
        ],
      }
    ],
    'hard': [
      {
        id: 'S11',
        title: 'Trafic humain en ligne',
        situation: 'Sophie découvre qu\'un réseau de trafic humain essaie de la recruter.',
        choices: [
          { label: 'A', text: 'Elle essaie de comprendre leurs motivations.', value: 'Cœur' },
          { label: 'B', text: 'Elle refuse et alerte immédiatement les autorités.', value: 'Sécurité' },
          { label: 'C', text: 'Elle gère seule la situation.', value: 'Liberté' },
        ],
      },
      {
        id: 'S12',
        title: 'Radicalisation en ligne',
        situation: 'Max découvre qu\'un groupe radical essaie de le recruter en ligne.',
        choices: [
          { label: 'A', text: 'Il essaie de comprendre leurs idées.', value: 'Cœur' },
          { label: 'B', text: 'Il refuse et alerte immédiatement les autorités.', value: 'Sécurité' },
          { label: 'C', text: 'Il gère seul la situation.', value: 'Liberté' },
        ],
      },
      {
        id: 'S13',
        title: 'Cybercriminalité',
        situation: 'Emma découvre qu\'un groupe de cybercriminels essaie de la recruter.',
        choices: [
          { label: 'A', text: 'Elle essaie de comprendre leurs motivations.', value: 'Cœur' },
          { label: 'B', text: 'Elle refuse et alerte immédiatement les autorités.', value: 'Sécurité' },
          { label: 'C', text: 'Elle gère seule la situation.', value: 'Liberté' },
        ],
      },
      {
        id: 'S14',
        title: 'Exploitation sexuelle',
        situation: 'Tom découvre qu\'un réseau d\'exploitation sexuelle essaie de le recruter.',
        choices: [
          { label: 'A', text: 'Il essaie de comprendre leurs motivations.', value: 'Cœur' },
          { label: 'B', text: 'Il refuse et alerte immédiatement les autorités.', value: 'Sécurité' },
          { label: 'C', text: 'Il gère seul la situation.', value: 'Liberté' },
        ],
      },
      {
        id: 'S15',
        title: 'Terrorisme en ligne',
        situation: 'Alex découvre qu\'un groupe terroriste essaie de le recruter en ligne.',
        choices: [
          { label: 'A', text: 'Il essaie de comprendre leurs idées.', value: 'Cœur' },
          { label: 'B', text: 'Il refuse et alerte immédiatement les autorités.', value: 'Sécurité' },
          { label: 'C', text: 'Il gère seul la situation.', value: 'Liberté' },
        ],
      }
    ]
  }
};

// Fonction pour obtenir une situation aléatoire selon la catégorie et la difficulté
export function getRandomSituation(category, difficulty = 'medium') {
  const situations = SITUATIONS_DATABASE[category]?.[difficulty];
  if (!situations || situations.length === 0) {
    return null;
  }
  return situations[Math.floor(Math.random() * situations.length)];
}

// Fonction pour obtenir toutes les situations d'une catégorie
export function getAllSituations(category) {
  const categorySituations = SITUATIONS_DATABASE[category];
  if (!categorySituations) return [];
  
  return [
    ...categorySituations.easy,
    ...categorySituations.medium,
    ...categorySituations.hard
  ];
}

// Fonction pour obtenir le nombre total de situations
export function getTotalSituationsCount() {
  let total = 0;
  Object.values(SITUATIONS_DATABASE).forEach(category => {
    Object.values(category).forEach(difficulty => {
      total += difficulty.length;
    });
  });
  return total;
}