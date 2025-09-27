#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

typedef enum {
    VALUE_LIBERTE = 0,
    VALUE_COEUR = 1,
    VALUE_REGLES = 2,
    VALUE_SECURITE = 3,
    VALUE_COUNT = 4
} Value;

static const char *VALUE_NAMES[VALUE_COUNT] = {
    "Liberté", "Cœur", "Règles", "Sécurité"
};

typedef struct {
    const char *title;
    const char *choiceA;
    const char *choiceB;
    const char *choiceC;
    Value expectedValue; /* which value the majority should align with */
    char expectedAnswer; /* 'A','B','C' typically */
} Situation;

typedef struct {
    const char *prompt;
} Gage;

static Situation SITUATIONS[] = {
    {
        .title = "Repas silencieux",
        .choiceA = "On range tous les téléphones pendant le repas.",
        .choiceB = "Un seul peut garder son tel ‘au cas où’.",
        .choiceC = "On met une série en fond pour éviter le silence.",
        .expectedValue = VALUE_COEUR,
        .expectedAnswer = 'A'
    },
    {
        .title = "Mot de passe secret",
        .choiceA = "Chacun son mot de passe, mais un ‘contact secours’ parent.",
        .choiceB = "Tous les mots de passe sont partagés en famille.",
        .choiceC = "Aucun mot de passe, tel déverrouillé.",
        .expectedValue = VALUE_SECURITE,
        .expectedAnswer = 'A'
    },
    {
        .title = "Messages nocturnes",
        .choiceA = "Mode nuit + téléphone hors chambre la nuit.",
        .choiceB = "Notifications coupées, mais téléphone sous l’oreiller.",
        .choiceC = "On répond si ‘urgent’.",
        .expectedValue = VALUE_SECURITE,
        .expectedAnswer = 'A'
    },
    {
        .title = "Temps d’écran qui déborde",
        .choiceA = "On fixe un créneau clair et un minuteur visible.",
        .choiceB = "On négocie à chaque fois selon l’humeur.",
        .choiceC = "On joue tant que les devoirs avancent ‘globalement’.",
        .expectedValue = VALUE_REGLES,
        .expectedAnswer = 'A'
    }
};

static const size_t SITUATION_COUNT = sizeof(SITUATIONS)/sizeof(SITUATIONS[0]);

static Gage GAGES[] = {
    {"Mime un monstre-notif pendant 10 secondes."},
    {"Parle sans ‘écran/phone/tel’ dans ta phrase suivante."},
    {"Fais une pub de 15 s ‘anti-scroll infini’."},
    {"Décris une soirée idéale sans écran en 20 s."},
    {"Invente un sticker-emoji ‘Esprit Déconnecteur’."},
    {"Raconte un moment où tu t’es senti(e) vraiment présent(e)."}
};

static const size_t GAGE_COUNT = sizeof(GAGES)/sizeof(GAGES[0]);

static void flush_line(void) {
    int ch;
    while ((ch = getchar()) != '\n' && ch != EOF) { }
}

static int read_int(const char *label, int minVal, int maxVal) {
    for (;;) {
        printf("%s", label);
        fflush(stdout);
        char buffer[64];
        if (!fgets(buffer, sizeof(buffer), stdin)) return minVal;
        char *endptr = NULL;
        long v = strtol(buffer, &endptr, 10);
        if (endptr == buffer) {
            printf("Veuillez entrer un nombre.\n");
            continue;
        }
        if (v < minVal || v > maxVal) {
            printf("Entrez une valeur entre %d et %d.\n", minVal, maxVal);
            continue;
        }
        return (int)v;
    }
}

static char read_choice_ABC(const char *label) {
    for (;;) {
        printf("%s", label);
        fflush(stdout);
        char buffer[64];
        if (!fgets(buffer, sizeof(buffer), stdin)) return 'A';
        if (buffer[0] == 'A' || buffer[0] == 'a') return 'A';
        if (buffer[0] == 'B' || buffer[0] == 'b') return 'B';
        if (buffer[0] == 'C' || buffer[0] == 'c') return 'C';
        printf("Choix invalide. Tapez A, B ou C.\n");
    }
}

static Value read_value_vote(int voterIndex) {
    printf("Vote secret du joueur %d — valeurs: 0=Liberté, 1=Cœur, 2=Règles, 3=Sécurité\n", voterIndex + 1);
    int v = read_int("Votre vote: ", 0, 3);
    return (Value)v;
}

static void print_onboarding(void) {
    printf("\n=== La Famille Déboussolée ===\n\n");
    printf("Objectif: Libérer l’Esprit de Famille en gagnant des étoiles.\n");
    printf("Comment: Traverser des illusions et décider ensemble.\n");
    printf("Valeurs: 0=Liberté, 1=Cœur, 2=Règles, 3=Sécurité.\n\n");
}

typedef enum {
    COMPASS_NORD = 0,
    COMPASS_EST = 1,
    COMPASS_SUD = 2,
    COMPASS_OUEST = 3,
    COMPASS_BETWEEN = 4
} CompassOutcome;

static const char *COMPASS_NAMES[] = {
    "Nord ✨", "Est 🤝", "Sud 🎭", "Ouest 😵", "Entre deux cadrans"
};

static CompassOutcome spin_compass(void) {
    int r = rand() % 10; /* bias some "between" */
    if (r < 2) return COMPASS_NORD;     /* 20% */
    if (r < 4) return COMPASS_EST;      /* 20% */
    if (r < 6) return COMPASS_SUD;      /* 20% */
    if (r < 8) return COMPASS_OUEST;    /* 20% */
    return COMPASS_BETWEEN;             /* 20% */
}

static int play_gage(void) {
    size_t i = (size_t)(rand() % (int)GAGE_COUNT);
    printf("Gage: %s\n", GAGES[i].prompt);
    return 0; /* no score change directly */
}

static int play_situation_round(int numPlayers, int activePlayerIndex, int *stars) {
    size_t idx = (size_t)(rand() % (int)SITUATION_COUNT);
    Situation *s = &SITUATIONS[idx];
    printf("\nIllusion: %s\n", s->title);
    printf("A) %s\n", s->choiceA);
    printf("B) %s\n", s->choiceB);
    printf("C) %s\n", s->choiceC);
    char ans = read_choice_ABC("Joueur actif, votre choix (A/B/C): ");

    int votes[VALUE_COUNT] = {0,0,0,0};
    for (int i = 0; i < numPlayers; ++i) {
        if (i == activePlayerIndex) continue;
        Value v = read_value_vote(i);
        if (v >= 0 && v < VALUE_COUNT) votes[v] += 1;
    }
    int maxVotes = -1; int majorityValue = -1;
    for (int v = 0; v < VALUE_COUNT; ++v) {
        if (votes[v] > maxVotes) { maxVotes = votes[v]; majorityValue = v; }
    }
    printf("Valeur majoritaire: %s\n", majorityValue >= 0 ? VALUE_NAMES[majorityValue] : "Aucune");

    if ((Value)majorityValue == s->expectedValue && ans == s->expectedAnswer) {
        *stars += 2;
        printf("Alignement! +2 étoiles. Total: %d\n", *stars);
    } else {
        *stars -= 1; if (*stars < 0) *stars = 0;
        printf("L’esprit malin ricane… -1 étoile. Total: %d\n", *stars);
    }
    return 0;
}

int main(void) {
    srand((unsigned int)time(NULL));
    print_onboarding();

    int numPlayers = read_int("Nombre de joueurs (2-8): ", 2, 8);
    int stars = 0;
    int active = 0;
    const int targetStars = 10;

    printf("\nLa quête commence! Atteignez %d étoiles pour libérer l’Esprit de Famille.\n", targetStars);

    while (stars < targetStars) {
        printf("\n— Tour du joueur %d — Appuyez sur Entrée pour tourner la Boussole…\n", active + 1);
        fflush(stdout);
        (void)getchar();

        CompassOutcome co = spin_compass();
        printf("La Boussole indique: %s\n", COMPASS_NAMES[co]);
        switch (co) {
            case COMPASS_NORD:
                stars += 1;
                printf("Une lumière éclaire le chemin! +1 étoile. Total: %d\n", stars);
                break;
            case COMPASS_EST: {
                printf("Co-décision: le joueur actif peut demander l’avis d’un co-pilote.\n");
                /* No extra mechanics for CLI; proceed to situation */
                play_situation_round(numPlayers, active, &stars);
                break;
            }
            case COMPASS_SUD:
                play_gage();
                break;
            case COMPASS_OUEST:
                printf("Brouillard… on perd son tour.\n");
                break;
            case COMPASS_BETWEEN:
                play_situation_round(numPlayers, active, &stars);
                break;
        }

        if (stars >= targetStars) break;
        active = (active + 1) % numPlayers;
    }

    printf("\nLa cage se fissure… L’Esprit de Famille est libéré!\n");
    printf("Les Déboussolés retrouvent leur Nord: Liberté, Cœur, Règles, Sécurité.\n");
    printf("Merci d’avoir joué.\n");
    return 0;
}

