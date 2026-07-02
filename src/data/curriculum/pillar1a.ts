import type { Unit } from '../types';

export const pillar1UnitsA: Unit[] = [
  {
    id: 'p1u1',
    title: 'The Beginning: Made to Know and Love God',
    ccc: '1-25',
    summary: 'The Prologue of the Catechism: God made us to know, love, and serve him, and the Church hands on this faith so that everyone may find life in Christ.',
    lessons: [
      {
        id: 'p1u1l1',
        title: "God's Plan of Loving Goodness",
        ccc: '1-10',
        scripture: 'Matthew 28:19-20',
        objective: 'Understand that God created us out of love to share his own blessed life, and that the Church exists to hand on this good news to every generation.',
        teaching: {
          child: "God made you because he loves you. He did not need to make anything, but he wanted to share his happiness with you. God wants you to know him, to love him, and one day to live with him forever in heaven. That is why Jesus told his friends to go and teach everyone about him. When someone teaches you about God, they are giving you the most wonderful gift there is.",
          youth: "Why do you exist? The Catechism opens with the answer: God, who is infinitely perfect and blessed in himself, freely created you to share in his own blessed life. Life is not random; it has a purpose, and that purpose is friendship with God. Because God wants everyone to be saved and to know the truth, he sent his Son and gathered a Church to spread the good news. Handing on the faith, called catechesis, is how each generation receives what the apostles received from Jesus himself. Learning your faith is not homework; it is discovering the reason you were made.",
          adult: "The Catechism begins with the purpose of human existence: God, infinitely perfect and blessed in himself, in a plan of sheer goodness freely created man to make him share in his own blessed life (CCC 1). At every time and in every place God draws close to us, calling us to seek him, to know him, and to love him with all our strength. Because sin scattered the human family, God sent his Son as Redeemer and Savior and calls all people into the unity of his family, the Church (CCC 1-3). Those who respond to this call are sent in turn: Christ commissioned the apostles to make disciples of all nations. Catechesis, from the Greek word for 'echoing' the teaching, is the effort to hand on the faith, an education in the faith of children, young people, and adults that aims at communion with Jesus Christ (CCC 4-5). The transmission of the faith is therefore not the sharing of an opinion but the handing on of divine life."
        },
        keyPoints: [
          'God, infinitely perfect and blessed in himself, freely created us out of sheer goodness to share his own blessed life (CCC 1).',
          'The purpose of life is to seek, know, and love God, and to be gathered into his family, the Church (CCC 1-3).',
          'Christ commanded the apostles to make disciples of all nations, so handing on the faith is the mission of the whole Church (CCC 2-3).',
          "Catechesis means 'echoing' the teaching of Christ: an education in the faith that leads to communion with him (CCC 4-5)."
        ],
        memory: { label: 'Memory Verse', text: '"Go therefore and make disciples of all nations... teaching them to observe all that I have commanded you; and lo, I am with you always, to the close of the age." (Matthew 28:19-20)' },
        quiz: [
          {
            question: 'Why did God create us?',
            options: ['Because he was lonely and needed us', 'Out of pure love, so we could share his own blessed life', 'To have servants to do work for him'],
            answerIndex: 1,
            explanation: 'God, blessed in himself, created us in a plan of sheer goodness to make us share in his own blessed life (CCC 1).'
          },
          {
            question: 'What did Jesus tell his apostles to do before he ascended to heaven?',
            options: ['Make disciples of all nations and teach them everything he commanded', 'Keep his teaching a secret', 'Write a book and wait'],
            answerIndex: 0,
            explanation: 'Christ sent the apostles to proclaim the Gospel and make disciples of all nations, the mission the Church continues today (CCC 2).'
          },
          {
            question: "What does the word 'catechesis' mean?",
            options: ['A kind of church building', "Handing on and 'echoing' the teaching of the faith", 'A list of rules invented by people'],
            answerIndex: 1,
            explanation: "Catechesis is an education in the faith, an 'echoing' of Christ's teaching handed on from generation to generation (CCC 4-5)."
          }
        ],
        reflection: {
          child: 'God made you on purpose because he loves you. How does that make you feel?',
          youth: 'If your life has a purpose given by God, what would change this week if you really believed it?',
          adult: 'When you honestly review your days, what do you actually live for, and how close is that to the purpose the Catechism names: to know, love, and share the life of God?'
        },
        activity: {
          child: 'Draw a picture of yourself with God, and write under it: "God made me because he loves me."',
          youth: 'Write down in one sentence why you think God made you, then compare it with CCC 1 and see what you would add.',
          adult: 'Spend five minutes in silence asking: "Lord, why did you make me?" and end by slowly praying the words of CCC 1.'
        }
      },
      {
        id: 'p1u1l2',
        title: 'What Is the Catechism?',
        ccc: '11-25',
        scripture: '1 Corinthians 13:8-13',
        objective: 'Discover that the Catechism presents the whole Catholic faith in four pillars, taught in a way adapted to each learner, and that everything in it is ordered to love.',
        teaching: {
          child: "The Catechism is a big book that tells us what Catholics believe. It has four parts, like a house with four strong walls: what we believe, how we celebrate with God in the sacraments, how we live as his children, and how we pray. Grown-ups who teach you the faith use words you can understand, because God wants every child to know him. And the most important thing the whole book teaches is love, because God is love.",
          youth: "The Catechism of the Catholic Church is the Church's organized presentation of everything essential that Catholics believe and live. It stands on four pillars: the Creed (what we believe), the sacraments (how God's life reaches us), the moral life (how we live in Christ), and prayer (how we talk with God). These four are not separate subjects; believing, celebrating, living, and praying are one single life of faith. The Church also teaches that catechists must adapt their teaching to the age and situation of learners, without ever changing the truth itself. And the Catechism gives its own key at the end of its prologue: everything in it exists to lead you to love, because doctrine without charity misses the whole point.",
          adult: "The Catechism of the Catholic Church is an organic presentation of the Catholic faith, intended above all for those responsible for catechesis, and through them for all the faithful (CCC 11-12). Its plan follows four pillars drawn from the great tradition of catechisms: the baptismal profession of faith (the Creed), the sacraments of faith, the life of faith (the Commandments), and the prayer of the believer (the Lord's Prayer) (CCC 13-17). These four dimensions illuminate one another: what we believe we celebrate, what we celebrate we live, and what we live we pray. The Catechism itself notes that it must be adapted: presentations of doctrine are to be adjusted to differences of culture, age, spiritual maturity, and social condition of those being taught, a task belonging to particular catechisms and, above all, to teachers themselves (CCC 24). Its final prologue paragraph gives the hermeneutic of the whole work, quoting the Roman Catechism: the whole concern of doctrine and its teaching must be directed to the love that never ends (CCC 25). Doctrine is not an end in itself; it exists so that we may know, and therefore love, the God who first loved us."
        },
        keyPoints: [
          'The Catechism presents the faith in four pillars: the Creed, the sacraments, life in Christ, and prayer (CCC 13-17).',
          'These four parts form one whole: what we believe, we celebrate, live, and pray (CCC 13-17).',
          "Teaching must be adapted to the learner's age, culture, and maturity, without altering the truth of the faith (CCC 24).",
          "Everything in the Catechism is directed to love: 'the whole concern of doctrine... must be directed to the love that never ends' (CCC 25)."
        ],
        memory: { label: 'Memory Verse', text: '"So faith, hope, love abide, these three; but the greatest of these is love." (1 Corinthians 13:13)' },
        quiz: [
          {
            question: 'How many pillars, or main parts, does the Catechism have?',
            options: ['Two', 'Four', 'Ten'],
            answerIndex: 1,
            explanation: 'The Catechism is built on four pillars: the Creed, the sacraments, life in Christ, and prayer (CCC 13-17).'
          },
          {
            question: 'What must all the teaching of the Catechism lead us to?',
            options: ['Love that never ends', 'Winning arguments', 'Memorizing every page'],
            answerIndex: 0,
            explanation: 'Quoting the Roman Catechism, CCC 25 teaches that the whole concern of doctrine must be directed to the love that never ends.'
          },
          {
            question: 'Should the faith be taught the same way to a small child and to an adult?',
            options: ['Yes, with exactly the same words for everyone', 'No, teaching is adapted to the learner, but the truth stays the same', 'No, children should be taught a different faith'],
            answerIndex: 1,
            explanation: 'The Catechism calls for adaptations to age, culture, and maturity in presenting the one unchanging faith (CCC 24).'
          }
        ],
        reflection: {
          child: 'The Catechism teaches us to believe, celebrate, live, and pray. Which of those four do you like doing best with God?',
          youth: 'Which of the four pillars (believing, sacraments, living, praying) is strongest in your life right now, and which needs the most attention?',
          adult: 'If all doctrine is directed to the love that never ends, where has your knowledge of the faith actually deepened your charity, and where has it remained only information?'
        },
        activity: {
          child: 'Draw a house with four strong walls and label them: Believe, Celebrate, Live, Pray.',
          youth: 'Find a copy of the Catechism (in print or online) and look at its table of contents to spot the four pillars yourself.',
          adult: 'Read CCC 25 slowly, then choose one concrete act of charity to do today as the "point" of your study.'
        }
      }
    ]
  },
  {
    id: 'p1u2',
    title: 'God Comes to Meet Us: Revelation',
    ccc: '26-141',
    summary: 'The human heart longs for God, and God answers by revealing himself: gradually in history, fully in Jesus Christ, and handed on to us through Sacred Tradition and Sacred Scripture.',
    lessons: [
      {
        id: 'p1u2l1',
        title: 'The Desire for God',
        ccc: '26-49',
        scripture: 'Acts 17:26-28',
        objective: 'Understand that the desire for God is written in every human heart and that God can be known with certainty from creation by the light of human reason.',
        teaching: {
          child: "Deep inside your heart there is a special longing that only God can fill. Everyone in the whole world has it, because God made us for himself. When you see the stars, the sea, or a tiny flower, they are like little signs pointing to the God who made them. Even before anyone tells us about God, our hearts are already looking for him. And the wonderful news is that God is looking for us too.",
          youth: "Have you noticed that nothing in this world ever satisfies you completely? A new phone, a win, a great day: the happiness fades and you want more. The Catechism says this is because the desire for God is written in your heart; you were made by God and for God, and only in him will you find the truth and happiness you keep searching for. You can actually come to know that God exists by thinking hard about the world (its order, beauty, and beginning) and about yourself (your conscience, your longing for truth and for the infinite). Reason can know with certainty that God exists, even though sin and distraction make this hard, which is why God also chose to reveal himself. Saint Augustine said it best: our hearts are restless until they rest in God.",
          adult: "The Catechism teaches that the desire for God is written in the human heart, because man is created by God and for God; God never ceases to draw man to himself, and only in God will man find the truth and happiness he never stops searching for (CCC 27). The history of religions witnesses to this universal search, however imperfectly expressed (CCC 28). There are converging 'ways' of approaching God from creation: the physical world, with its movement, contingency, order, and beauty, and the human person, with openness to truth and beauty, moral conscience, freedom, and the longing for the infinite (CCC 31-35). The Church holds, following Romans 1 and the First Vatican Council, that God can be known with certainty from created things by the natural light of human reason (CCC 36). Yet in the concrete conditions of fallen humanity, we stand in need of Revelation, not only for truths that exceed reason, but even so that religious and moral truths accessible to reason can be known by all with ease, firm certainty, and no admixture of error (CCC 37-38). Because God transcends every creature, our language about him is analogical: true, yet always falling short of his infinite mystery (CCC 39-43)."
        },
        keyPoints: [
          'The desire for God is written in the human heart: we are created by God and for God (CCC 27).',
          'From the created world and the human person, reason can know with certainty that God exists (CCC 31-36).',
          'Because of sin and weakness, we also need Revelation to know God and religious truth with ease and without error (CCC 37-38).',
          'Our words about God are true but limited: God is infinitely greater than anything we can say about him (CCC 39-43).'
        ],
        memory: { label: 'Memory Verse', text: '"He is not far from each one of us, for in him we live and move and have our being." (Acts 17:27-28)' },
        quiz: [
          {
            question: 'Where has God placed the desire for himself?',
            options: ['Only in the hearts of priests and sisters', 'In every human heart', 'Only in people who go to church'],
            answerIndex: 1,
            explanation: 'The desire for God is written in the human heart, because every person is created by God and for God (CCC 27).'
          },
          {
            question: 'Can we come to know that God exists by looking at the world he made?',
            options: ['Yes, creation points to its Creator and reason can know him with certainty', 'No, there is no way at all to know God exists', 'Only scientists can know God exists'],
            answerIndex: 0,
            explanation: 'God can be known with certainty from his works by the natural light of human reason (CCC 36).'
          },
          {
            question: 'Why do our hearts stay restless until we find God?',
            options: ['Because we do not sleep enough', 'Because nothing on earth is interesting', 'Because we were made for God and only he can fully satisfy us'],
            answerIndex: 2,
            explanation: 'Only in God will man find the truth and happiness he never stops searching for (CCC 27).'
          }
        ],
        reflection: {
          child: 'What is the most beautiful thing you have ever seen? Say thank you to God who made it.',
          youth: 'What do you chase after when you feel empty, and what would it mean to bring that restlessness to God instead?',
          adult: 'Recall a moment when beauty, conscience, or longing pointed you beyond yourself; how did God use it to draw you, and how did you respond?'
        },
        activity: {
          child: 'Go outside or look out a window, find three beautiful things God made, and thank him for each one.',
          youth: "Write Saint Augustine's line, 'Our hearts are restless until they rest in you,' somewhere you will see it this week.",
          adult: 'Spend five minutes reviewing your desires today, asking where each one, purified, ultimately points to God.'
        }
      },
      {
        id: 'p1u2l2',
        title: 'God Reveals Himself',
        ccc: '50-73',
        scripture: 'Hebrews 1:1-2',
        objective: 'Understand that God freely makes himself known to us, gradually in history and fully in Jesus Christ.',
        teaching: {
          child: "God did not want to stay hidden from us. Because he loves us, he told us about himself a little at a time, the way a good friend shares what is in his heart. He spoke to Noah, to Abraham, and to Moses. Then he gave us the best gift of all: he sent his own Son, Jesus. When we look at Jesus, we see what God is really like.",
          youth: "You can figure out that God exists by looking at creation, but you cannot know his heart unless he tells you. That is what Revelation means: God freely chose to make himself known, step by step, through covenants with Noah, Abraham, and Israel. This slow, patient teaching prepared the world for Jesus Christ, the Father's final Word. In Jesus, God has said everything; there will be no other revelation after him.",
          adult: "Revelation is God's free decision to make himself and the hidden purpose of his will known to us, so that we can share his divine life (CCC 50-53). This self-disclosure unfolds as a divine pedagogy: God communicates himself gradually, through the covenant with Noah, the call of Abraham, and the formation of Israel, culminating in the Incarnation. Jesus Christ is the mediator and fullness of all Revelation; in giving us his Son, the Father has spoken his definitive Word (CCC 65). The Church therefore awaits no new public revelation before Christ's return in glory, though so-called private revelations, if recognized, may help us live the Gospel more fully in a certain age (CCC 66-67)."
        },
        keyPoints: [
          'God reveals himself out of love, inviting us to become his adopted children (CCC 52).',
          'Revelation unfolded gradually through covenants with Noah, Abraham, and Israel (CCC 54-64).',
          'Jesus Christ is the fullness of Revelation: the Father has said everything in his Son (CCC 65).',
          'No new public revelation is to be expected before Christ returns in glory (CCC 66).'
        ],
        memory: { label: 'Memory Verse', text: '"In many and various ways God spoke of old to our fathers by the prophets; but in these last days he has spoken to us by a Son." (Hebrews 1:1-2)' },
        quiz: [
          { question: 'Why did God reveal himself to us?', options: ['Because he needed our help', 'Because he loves us and wants us to share his life', 'Because people demanded proof'], answerIndex: 1, explanation: 'God reveals himself out of pure love, to invite us into communion with him (CCC 52).' },
          { question: "Who is the fullness of God's Revelation?", options: ['Moses', 'The prophets', 'Jesus Christ'], answerIndex: 2, explanation: "Christ, the Son of God made man, is the Father's one, perfect, and unsurpassable Word (CCC 65)." },
          { question: 'How did God teach his people before Jesus came?', options: ['All at once, in a single day', 'Gradually, through covenants like those with Noah and Abraham', 'He did not speak to anyone'], answerIndex: 1, explanation: 'God communicated himself gradually, preparing humanity by stages to welcome Revelation (CCC 53-64).' }
        ],
        reflection: {
          child: 'God wants to be your friend. What would you like to tell him today?',
          youth: 'If Jesus shows us exactly what God is like, what is one thing about God you understand better by looking at Jesus?',
          adult: 'Where in your own history can you trace a "divine pedagogy" - God preparing you, by stages, for a deeper friendship with him?'
        },
        activity: {
          child: 'Draw a picture of one way God shows his love, and tell someone in your family about it.',
          youth: 'Read Hebrews 1:1-2 slowly, twice, and write one sentence about what it means to you.',
          adult: 'Spend ten minutes with Hebrews 1:1-2 in lectio divina: read, meditate, pray, rest.'
        }
      },
      {
        id: 'p1u2l3',
        title: 'Handing On the Faith: Tradition and Scripture',
        ccc: '74-100',
        scripture: '2 Thessalonians 2:15',
        objective: 'Understand that the one Gospel of Christ comes to us through Sacred Tradition and Sacred Scripture together, faithfully interpreted by the Magisterium of the Church.',
        teaching: {
          child: "Jesus gave his good news to the apostles, and they passed it on like a precious treasure. Some of it was written down in the Bible, and some was handed on by teaching, by prayer, and by the way the Church lives. This handing on is called Tradition. The pope and the bishops keep the treasure safe so nothing true is ever lost. That is how the same faith Jesus gave his friends comes all the way down to you.",
          youth: "How do we know today what Jesus really taught two thousand years ago? Jesus commissioned the apostles to preach the Gospel, and they handed it on in two ways: in writing, which became the New Testament, and by their living preaching, example, and the institutions they established, which the Church calls Sacred Tradition. Scripture and Tradition are not two rival sources; they flow from the same divine wellspring and together form one sacred deposit of the Word of God. To keep this deposit from being twisted or lost, Christ gave the apostles' successors, the pope and the bishops, the task of authentically interpreting it; this teaching office is called the Magisterium. The Magisterium is not above God's Word but serves it, teaching only what has been handed on. Scripture, Tradition, and the Magisterium work together like three strands of one rope, so that you can be sure the faith you receive is the faith of the apostles.",
          adult: "God's Revelation, complete in Christ, must reach all generations, so Christ commanded the apostles to preach the Gospel; they did so orally and in writing, and appointed bishops as their successors, so that apostolic preaching would be preserved in a continuous line until the end of time (CCC 74-77). This living transmission, accomplished in the Holy Spirit through the Church's doctrine, life, and worship, is called Sacred Tradition, distinct from Scripture though closely bound to it (CCC 78). Sacred Tradition and Sacred Scripture flow from the same divine wellspring, make up a single sacred deposit of the Word of God, and are to be accepted and honored with equal sentiments of devotion and reverence (CCC 80-82, 84, 97). Sacred Tradition in this sense must be distinguished from ecclesial traditions (theological, disciplinary, liturgical, devotional customs) that can change over time (CCC 83). The task of authentically interpreting the Word of God has been entrusted to the living Magisterium alone: the bishops in communion with the successor of Peter. Yet this Magisterium is not superior to the Word of God but is its servant, teaching only what has been handed on, listening to it devoutly, guarding it scrupulously, and explaining it faithfully (CCC 85-86). The whole People of God, anointed by the Spirit, shares an unfailing supernatural sense of the faith when it adheres to this deposit (CCC 91-93)."
        },
        keyPoints: [
          'The apostles handed on the Gospel both orally (Tradition) and in writing (Scripture), and appointed bishops as their successors (CCC 76-77).',
          'Sacred Tradition and Sacred Scripture flow from the same divine wellspring and form one sacred deposit of the Word of God (CCC 80-84, 97).',
          'The Magisterium (the pope and bishops in communion with him) alone authentically interprets the Word of God (CCC 85).',
          'The Magisterium is not above the Word of God but serves it, teaching only what has been handed on (CCC 86).'
        ],
        memory: { label: 'Memory Verse', text: '"Stand firm and hold to the traditions which you were taught by us, either by word of mouth or by letter." (2 Thessalonians 2:15)' },
        quiz: [
          {
            question: 'In how many ways did the apostles hand on the Gospel?',
            options: ['Only by writing the Bible', 'In two ways: by their spoken teaching and way of life (Tradition) and in writing (Scripture)', 'They kept it to themselves'],
            answerIndex: 1,
            explanation: 'The Gospel was handed on orally and in writing, and both together transmit the one Word of God (CCC 76).'
          },
          {
            question: 'Who did Christ entrust with authentically interpreting the Word of God?',
            options: ['The Magisterium: the pope and the bishops in communion with him', 'Each person alone, with no help from anyone', 'The government'],
            answerIndex: 0,
            explanation: 'The task of giving an authentic interpretation of the Word of God has been entrusted to the living teaching office of the Church (CCC 85).'
          },
          {
            question: 'Is the Magisterium above the Word of God?',
            options: ['Yes, it can change the Gospel', 'Yes, it invents new revelations', 'No, it is the servant of the Word and teaches only what has been handed on'],
            answerIndex: 2,
            explanation: 'The Magisterium is not superior to the Word of God but its servant, teaching only what has been handed on (CCC 86).'
          }
        ],
        reflection: {
          child: 'The faith is a treasure passed down to you. Who has helped hand the treasure of faith to you?',
          youth: 'You received the faith from a chain of witnesses going back to the apostles; who is the next person you could pass it on to?',
          adult: 'Do you receive Scripture and the living Tradition of the Church with equal reverence, or do you quietly set aside the parts that challenge you?'
        },
        activity: {
          child: 'Ask a parent or grandparent to tell you one thing about Jesus that they learned when they were small.',
          youth: 'Make a simple chain on paper: Jesus, the apostles, the early Church, the saints, your teachers, you, and thank God for each link.',
          adult: 'Thank God by name for the people who handed the faith to you, and pray for one person to whom you will hand it on.'
        }
      },
      {
        id: 'p1u2l4',
        title: "Sacred Scripture: God's Word in Human Words",
        ccc: '101-141',
        scripture: '2 Timothy 3:14-17',
        objective: 'Understand that God is the author of Sacred Scripture, which teaches without error the truth he wanted written for our salvation, and learn how the Church reads and lives from it.',
        teaching: {
          child: "The Bible is God's own letter of love to us. God chose people to write it, and the Holy Spirit helped them write just what God wanted, so everything it teaches for our salvation is true. The Bible has two parts, the Old Testament and the New Testament, and both tell one big story that leads to Jesus. At Mass we stand up for the Gospel because Jesus himself speaks to us in it. When you listen to the Bible, God is really talking to you.",
          youth: "The Bible is not an ordinary book: God himself is its author, because he inspired the human writers, who were true authors too, using their own talents and ways of speaking. That is why Scripture teaches firmly, faithfully, and without error the truth God wanted written down for the sake of our salvation. The Bible is a library of 73 books, 46 in the Old Testament and 27 in the New, and the two testaments shed light on each other: the Old prepares for the New, and the New fulfills the Old. To read it well you look for what the human author actually meant (the literal sense) and also for the deeper meanings God built in (the spiritual senses), always reading within the living Tradition of the Church. The Church venerates the Scriptures as she venerates the Lord's own Body, and Saint Jerome warned that ignorance of the Scriptures is ignorance of Christ. So open your Bible: it is God speaking with you.",
          adult: "In Sacred Scripture, God speaks to man in a human way; the words of God, expressed in human language, resemble the Incarnation of the Word (CCC 101-104). God is the author of Scripture: he inspired its human authors, who, as true authors, made full use of their own faculties and powers while writing whatever he wanted written, and no more (CCC 105-106). Consequently, the books of Scripture firmly, faithfully, and without error teach the truth which God, for the sake of our salvation, wished to see confided to them (CCC 107). Christianity is nevertheless not a 'religion of the book' but of the Word of God, the living Word who is Christ (CCC 108). Interpretation must attend to what the human authors intended and to what God reveals through them, reading Scripture in the same Spirit in which it was written: attentive to the content and unity of the whole, within the living Tradition of the Church, and according to the analogy of faith (CCC 109-114). The tradition distinguishes the literal sense from the spiritual senses (allegorical, moral, and anagogical) (CCC 115-119). The complete canon comprises 46 Old Testament books and 27 New Testament books; the Old Testament retains permanent value, and the two testaments illuminate each other (CCC 120-130). The Church venerates the Scriptures as she venerates the Lord's Body and desires that access to them be wide open to the faithful, for, as Saint Jerome said, ignorance of the Scriptures is ignorance of Christ (CCC 103, 131-133, 141)."
        },
        keyPoints: [
          'God is the author of Sacred Scripture: he inspired its human authors, who were themselves true authors (CCC 105-106).',
          'Scripture teaches firmly, faithfully, and without error the truth God wanted written for the sake of our salvation (CCC 107).',
          'The canon contains 46 Old Testament and 27 New Testament books, and the two testaments shed light on each other (CCC 120, 128-130).',
          "Scripture must be read within the living Tradition of the Church, attending to its literal and spiritual senses (CCC 111-119).",
          "The Church venerates the Scriptures as she venerates the Lord's Body: ignorance of Scripture is ignorance of Christ (CCC 103, 133)."
        ],
        memory: { label: 'Memory Verse', text: '"All scripture is inspired by God and profitable for teaching, for reproof, for correction, and for training in righteousness." (2 Timothy 3:16)' },
        quiz: [
          {
            question: 'Who is the author of Sacred Scripture?',
            options: ['God, who inspired the human writers who were true authors too', 'Only the human writers, with no help from God', 'Nobody knows'],
            answerIndex: 0,
            explanation: 'God inspired the human authors of the sacred books, so that God is the author of Scripture (CCC 105-106).'
          },
          {
            question: 'What does the Bible teach without error?',
            options: ['Every detail of modern science', 'The truth God wanted written down for the sake of our salvation', 'Nothing at all'],
            answerIndex: 1,
            explanation: 'The books of Scripture teach firmly, faithfully, and without error the truth God wished confided to them for our salvation (CCC 107).'
          },
          {
            question: 'How should a Catholic read the Bible?',
            options: ['Alone, ignoring what the Church teaches', 'Only on Christmas', 'Prayerfully, within the living Tradition of the Church'],
            answerIndex: 2,
            explanation: 'Scripture must be read in the Spirit in which it was written, within the living Tradition of the whole Church (CCC 111-113).'
          }
        ],
        reflection: {
          child: 'The Bible is God talking to you. What would you like God to tell you about?',
          youth: 'Saint Jerome said that not knowing the Bible is not knowing Christ; how well do you know the Gospels, and what could you do about it?',
          adult: 'Does the Word of God have a daily place in your life comparable to the reverence you show the Eucharist, and if not, what one habit would change that?'
        },
        activity: {
          child: 'Ask someone to read you one story about Jesus from the Gospels tonight, and listen for your favorite part.',
          youth: 'Find the table of contents in a Bible and count the books, then read one whole chapter of the Gospel of Mark.',
          adult: 'Begin a habit today: read one chapter of a Gospel slowly, and mark one verse to carry through the day.'
        }
      }
    ]
  },
  {
    id: 'p1u3',
    title: 'Our Response: I Believe',
    ccc: '142-197',
    summary: 'Faith is our free and personal response to the God who reveals himself: a grace, a human act, and a treasure we receive, profess, and live within the community of the Church.',
    lessons: [
      {
        id: 'p1u3l1',
        title: 'Faith: Saying Yes to God',
        ccc: '142-165',
        scripture: 'Hebrews 11:1',
        objective: "Understand that faith is our free 'yes' to God who reveals himself: a gift of grace, a truly human act, and a trust we are called to keep even in darkness.",
        teaching: {
          child: "When God speaks to us, he waits for our answer. Faith is saying yes to God: yes, I believe you; yes, I trust you; yes, I will follow you. Abraham said yes when God asked him to leave his home, even though he did not know where he was going. Mary said the most beautiful yes of all when God asked her to be the mother of Jesus. Faith is a gift God gives you, and you can ask him to make it grow. Even when things are hard, God never lets go of your hand.",
          youth: "Faith is not a vague feeling; it is your personal answer to a God who has spoken. The Bible calls this the obedience of faith: freely trusting God completely and accepting what he has revealed, because he can neither deceive nor be deceived. Abraham is the model: he obeyed when called, left everything, and trusted God's promise against all odds; Mary's yes at the Annunciation is the most perfect act of faith ever made. Faith is a grace, a gift of the Holy Spirit, but it is also a fully human act: believing God is no more against your freedom and intelligence than trusting a friend who has never lied to you. Faith seeks understanding: the more you believe, the more you want to know God, and real science can never truly contradict real faith, because the same God is the source of both. Faith can be tested by suffering and doubt, so it must be nourished by the Word of God, prayer, and the witness of believers like Abraham and Mary, who walked by faith and not by sight.",
          adult: "Faith is man's response to God who reveals himself and gives himself to man (CCC 142-143). To believe is to submit one's intellect and will freely to God: Scripture calls this the obedience of faith (CCC 144). Abraham, who 'believed God, and it was reckoned to him as righteousness,' is the father of all who believe, and the Virgin Mary is faith's most perfect embodiment, from her fiat at the Annunciation to her standing at the Cross (CCC 145-149). Faith is first of all a personal adherence to God himself, and inseparably a free assent to the whole truth he has revealed (CCC 150). It is a supernatural gift: no one can believe without the interior helps of the Holy Spirit (CCC 153). Yet believing is also an authentically human act, contrary neither to freedom nor to reason: trusting God's own word and entering the communion of faith perfects, rather than violates, our nature (CCC 154-155, 160). Faith seeks understanding, and there can be no real discrepancy between faith and reason, since the same God who reveals mysteries also bestows the light of reason (CCC 156-159). Faith is necessary for salvation, it is possible to lose it, and so we must nourish it with the Word of God, beg the Lord to increase it, and persevere to the end, looking to the witnesses who have gone before us (CCC 161-165)."
        },
        keyPoints: [
          "Faith is the free submission of our whole self to God who reveals himself: the 'obedience of faith' (CCC 143-144).",
          'Abraham is the father of all who believe, and Mary is the most perfect embodiment of the obedience of faith (CCC 145-149).',
          'Faith is a grace, a gift of God, and at the same time an authentically human and free act (CCC 153-155, 160).',
          'Faith and reason cannot truly contradict each other, and faith must be nourished and persevered in to the end (CCC 159, 161-162).'
        ],
        memory: { label: 'Memory Verse', text: '"Now faith is the assurance of things hoped for, the conviction of things not seen." (Hebrews 11:1)' },
        quiz: [
          {
            question: 'Who is called the father of all who believe because he trusted and obeyed God?',
            options: ['Abraham', 'Pharaoh', 'Goliath'],
            answerIndex: 0,
            explanation: 'Abraham believed God and obeyed his call, becoming the father of all who believe (CCC 145-146).'
          },
          {
            question: 'Is faith a gift from God or something we do ourselves?',
            options: ['Only something we achieve by effort', 'Both: a gift of grace and a free human act', 'Neither: it just happens by accident'],
            answerIndex: 1,
            explanation: 'Faith is a grace given by God and at the same time an authentically human, free act (CCC 153-155).'
          },
          {
            question: 'Can true faith and true science really contradict each other?',
            options: ['Yes, always', 'Yes, faith is against thinking', 'No, because the same God gives both revelation and reason'],
            answerIndex: 2,
            explanation: 'There can never be any real discrepancy between faith and reason, since both come from the same God (CCC 159).'
          }
        ],
        reflection: {
          child: 'Mary said yes to God with her whole heart. What is one way you can say yes to God today?',
          youth: 'Where is God asking for your trust right now, and what makes it hard to give it?',
          adult: 'Recall a season when your faith was tested; how did you persevere, and what nourishes your faith now: Word, prayer, community, or is it going hungry?'
        },
        activity: {
          child: 'Say a little prayer three times today: "Jesus, I believe in you. Help my faith grow."',
          youth: 'Read the story of the Annunciation (Luke 1:26-38) and underline the words of Mary\'s yes.',
          adult: 'Pray the prayer of the father in Mark 9:24, "I believe; help my unbelief," and name before God the one area where trust costs you most.'
        }
      },
      {
        id: 'p1u3l2',
        title: 'We Believe: Faith Is Not Alone',
        ccc: '166-184',
        scripture: 'Ephesians 4:4-6',
        objective: "Discover that faith is a personal act that is never solitary: we receive it from the Church, believe within the Church, and the Church is our mother and teacher in the faith.",
        teaching: {
          child: "Nobody learns to believe all alone. Someone taught you your prayers, someone brought you to church, and someone first told you about Jesus. The Church is like a big family of believers, and she is like a mother who teaches her children about God. All over the world, in every language, this family believes the same faith. When we say the Creed together at Mass, millions of voices become one: 'I believe!' You are never alone when you believe.",
          youth: "Faith is deeply personal: no one can say 'I believe' for you. But it is never private. You did not invent the faith; you received it, the way you received life and language, from the believing community that goes back to the apostles. That is why the Catechism says the Church is the mother of all believers: she believed first, and she bears, nourishes, and sustains your faith. Saint Cyprian put it sharply: no one can have God as Father who does not have the Church as Mother. Around the world the one faith is professed in hundreds of languages and cultures, yet it is the same faith, guarded and handed on since the apostles. So 'I believe' and 'We believe' belong together: your personal faith lives inside the great chorus of the whole Church.",
          adult: "The Creed exists in two voices: 'I believe,' the faith professed personally by each believer, above all at Baptism, and 'We believe,' the faith confessed by the Church assembled (CCC 166-167). Faith is a personal act, the free response of the human person to God's self-revelation, but it is not an isolated act: no one can believe alone, just as no one can live alone; each believer is a link in the great chain of believers, receiving faith from others and called to hand it on (CCC 166). It is the Church that believes first, and so bears, nourishes, and sustains the faith of each of us; through the Church we receive faith and new life in Christ by Baptism (CCC 168). Salvation comes from God alone, but because we receive the life of faith through the Church, she is our mother and our teacher in the faith (CCC 169-171). Through the centuries and across so many languages, cultures, peoples, and nations, the Church, guarding the faith received from the apostles, has never ceased to confess the one faith received from the one Lord, as Saint Irenaeus of Lyons testified already in the second century (CCC 172-175). Handing on the language of faith to children and catechumens is thus not indoctrination but the gift of a home in which faith can grow."
        },
        keyPoints: [
          "Faith is a personal act, yet no one can believe alone: every believer is a link in the chain of believers (CCC 166).",
          'The Church believes first, and so bears, nourishes, and sustains the faith of each Christian (CCC 168).',
          'Because we receive the life of faith through the Church, she is our mother and our teacher (CCC 169, 171).',
          'Across all languages and cultures, the Church professes one and the same faith received from the apostles (CCC 172-175).'
        ],
        memory: { label: 'Memory Verse', text: '"There is one body and one Spirit... one Lord, one faith, one baptism, one God and Father of us all." (Ephesians 4:4-6)' },
        quiz: [
          {
            question: 'Can anyone come to believe completely alone, with no help from others?',
            options: ['Yes, faith is a private invention', 'No, we receive faith from others and are called to hand it on', 'Yes, but only very smart people'],
            answerIndex: 1,
            explanation: 'No one can believe alone; each believer receives faith from others and is a link in the great chain of believers (CCC 166).'
          },
          {
            question: 'Why does the Catechism call the Church our mother?',
            options: ['Because she bears, nourishes, and sustains our faith and gives us new life in Baptism', 'Because churches are old buildings', 'Because everyone must be born in a church'],
            answerIndex: 0,
            explanation: 'The Church believes first and gives us the life of faith, so she is our mother and our teacher (CCC 168-169, 171).'
          },
          {
            question: 'When Catholics in different countries pray the Creed in different languages, what are they professing?',
            options: ['Different faiths for different places', 'Whatever each person prefers', 'One and the same faith received from the apostles'],
            answerIndex: 2,
            explanation: 'Through all languages and cultures the Church confesses the one faith received from the one Lord (CCC 172-175).'
          }
        ],
        reflection: {
          child: 'Who first told you about Jesus? Say a thank-you prayer for that person.',
          youth: 'You are one link in a chain of believers stretching back to the apostles; what kind of link do you want to be?',
          adult: 'Do you practice your faith as a solitary project or within the Church as mother; where do you resist being taught, carried, or corrected by her?'
        },
        activity: {
          child: 'At bedtime, pray one prayer together with your family instead of alone.',
          youth: 'Next Sunday at Mass, pray the Creed slowly and remember you are saying it with the whole Church around the world.',
          adult: 'Do one concrete act this week that plants your faith in the community: attend a weekday Mass, join a parish group, or pray for your parish by name.'
        }
      },
      {
        id: 'p1u3l3',
        title: 'The Creeds of the Church',
        ccc: '185-197',
        scripture: 'Romans 10:9-10',
        objective: "Understand what a creed is and why the Church treasures the Apostles' Creed and the Nicene Creed as faithful summaries of the faith.",
        teaching: {
          child: "A creed is a short way of saying what we believe. The word means 'I believe.' Long ago, the Church gathered the most important truths about God into short prayers so everyone could learn them by heart. The Apostles' Creed tells the faith of Jesus' first friends, the apostles. At Mass on Sunday we stand and say the Creed together, like a family saying, 'This is who our God is!' When you learn the Creed, you carry the whole faith in your heart.",
          youth: "From the beginning, the Church gathered the essentials of the faith into short summaries called creeds, or 'professions of faith,' so that every believer, especially at Baptism, could know and confess what Christians believe. They are also called 'symbols' of faith: in the ancient world a symbolon was a broken token whose two halves fit together to prove identity, so the Creed is the believer's badge of recognition and communion. Two creeds hold a special place. The Apostles' Creed is the ancient baptismal creed of the Church of Rome and is rightly called a faithful summary of the apostles' faith; the Nicene Creed (more fully, the Niceno-Constantinopolitan Creed) comes from the first two ecumenical councils and is still shared by the great Churches of East and West. The Creed has three parts, one for each divine Person: the Father and creation, the Son and redemption, the Holy Spirit and sanctification. To recite it is not just to list ideas; it is to enter into communion with God and with the whole Church that believes.",
          adult: "From her earliest days, the Church expressed and handed on her faith in brief, normative formulas: professions of faith, or creeds, from the Latin credo, 'I believe' (CCC 185-187). They are also called 'symbols' of faith, from the Greek symbolon, a half of a broken object presented as a token of identity: the symbol of faith is a sign of recognition and communion among believers, and a summary of the principal truths of the faith (CCC 188). The first profession of faith is made at Baptism, and since Baptism is given in the name of the Father, the Son, and the Holy Spirit, the Creed is structured in three parts, articulating the truths of faith by reference to the three Persons of the Trinity (CCC 189-190). Among the many creeds in the Church's history, two occupy a special place: the Apostles' Creed, the ancient baptismal symbol of the Church of Rome, rightly considered a faithful summary of the apostles' faith, and the Niceno-Constantinopolitan Creed, which draws its great authority from the first two ecumenical councils (Nicaea, 325, and Constantinople, 381) and remains common to the great Churches of East and West (CCC 193-195). As Saint Ambrose taught, this Creed is the spiritual seal and treasure of our heart, to be pondered and guarded throughout our lives (CCC 197)."
        },
        keyPoints: [
          "A creed, or symbol of faith, is a summary of the principal truths of the faith and a sign of recognition among believers (CCC 187-188).",
          'The Creed is structured in three parts, professing faith in the Father, the Son, and the Holy Spirit (CCC 189-190).',
          "The Apostles' Creed is the ancient baptismal creed of the Church of Rome and a faithful summary of the apostles' faith (CCC 194).",
          'The Nicene Creed comes from the first two ecumenical councils and is common to the great Churches of East and West (CCC 195).'
        ],
        memory: { label: 'Prayer to Learn', text: "The Apostles' Creed (opening): 'I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord.'" },
        quiz: [
          {
            question: "What does the word 'creed' mean?",
            options: ["'I believe'", "'I promise money'", "'I remember'"],
            answerIndex: 0,
            explanation: "Creed comes from the Latin credo, 'I believe,' the first word of the profession of faith (CCC 187)."
          },
          {
            question: 'How many main parts does the Creed have, and why?',
            options: ['Ten parts, one for each commandment', 'Three parts, one for each Person of the Holy Trinity', 'Two parts, one old and one new'],
            answerIndex: 1,
            explanation: 'The Creed is divided into three parts referring to the Father, the Son, and the Holy Spirit (CCC 190).'
          },
          {
            question: 'Which creed comes from the first two ecumenical councils and is shared by East and West?',
            options: ["The Apostles' Creed", 'The Creed of my parish', 'The Nicene (Niceno-Constantinopolitan) Creed'],
            answerIndex: 2,
            explanation: 'The Niceno-Constantinopolitan Creed stems from the councils of Nicaea and Constantinople and remains common to the great Churches of East and West (CCC 195).'
          }
        ],
        reflection: {
          child: 'The Creed says what we believe about God. Which part of the Creed do you like saying best?',
          youth: 'If someone asked you, "What do Christians actually believe?", could you answer with the Creed; which line would you most want to explain?',
          adult: 'Which article of the Creed do you profess with your lips but struggle to live from your heart, and what would it mean to guard it as the "treasure of your heart"?'
        },
        activity: {
          child: "Learn the first line of the Apostles' Creed by heart and say it to someone in your family.",
          youth: "Write out the Apostles' Creed by hand and circle the three parts: Father, Son, and Holy Spirit.",
          adult: "Pray the Apostles' Creed slowly today, pausing after each article to say: 'Lord, I believe this; let me live it.'"
        }
      }
    ]
  },
  {
    id: 'p1u4',
    title: 'I Believe in God the Father Almighty',
    ccc: '198-421',
    summary: 'The first article of the Creed: the one, living, and true God, the Holy Trinity, the almighty Father who creates heaven and earth, makes man and woman in his image, and, after the fall, promises a Savior.',
    lessons: [
      {
        id: 'p1u4l1',
        title: 'One God, Living and True',
        ccc: '199-231',
        scripture: 'Deuteronomy 6:4-5',
        objective: "Understand that there is only one God, who revealed his mysterious name 'I AM WHO I AM,' and who is truth and love, deserving our whole heart.",
        teaching: {
          child: "There is only one God, and he is alive and real. When Moses saw the burning bush, God told him his name: 'I AM WHO I AM.' That means God always was, always is, and always will be, and he is always close to his people. God never lies, so we can believe everything he says. And God is love: he loves you more than anyone else ever could. That is why we love him back with our whole heart.",
          youth: "The Creed begins with the biggest claim of all: 'I believe in one God.' Israel was surrounded by nations with countless idols, but God revealed to them the truth at the heart of everything: 'Hear, O Israel: the Lord our God is one Lord.' At the burning bush God told Moses his mysterious name, YHWH, 'I AM WHO I AM': he alone simply is, without beginning or end, the fullness of being, and at the same time the God who is faithfully present to his people. Because God is truth itself, his word can never deceive; because God is love, everything he does flows from love. Believing in one God changes how you live: it means knowing his greatness, living in thanksgiving, respecting the dignity of every person made in his image, using created things rightly, and trusting God in every circumstance, even in trouble. One God with one claim: your whole heart.",
          adult: "The profession of faith begins with God the Father, for the Father is the first divine Person of the Trinity and the Creed's other articles all depend on the first (CCC 198-199). God revealed himself to Israel as the One: 'Hear, O Israel: the LORD our God is one LORD' (CCC 200-202). To Moses at the burning bush he revealed his enigmatic name, YHWH, 'I AM WHO I AM': a name that both discloses and guards his mystery, expressing that God alone IS, the fullness of being and of every perfection, without origin and without end, while also declaring his faithful nearness: the God of Abraham, Isaac, and Jacob, who sees his people's affliction and comes down to deliver them (CCC 203-213). God is truth: his words cannot deceive, and his fidelity endures from age to age; he is also love, a love more tender than a mother's, which culminated in giving his only Son (CCC 214-221). Faith in the one God has immense consequences for life: coming to know God's greatness and majesty, living in thanksgiving, recognizing the unity and true dignity of all men and women, making good use of created things, and trusting God in every circumstance, even adversity (CCC 222-227)."
        },
        keyPoints: [
          "There is only one God, living and true, and the whole Creed rests on this first article (CCC 199-202).",
          "God revealed his name to Moses as 'I AM WHO I AM': he alone is the fullness of being, without beginning or end (CCC 203-213).",
          'God is truth, whose word cannot deceive, and God is love, who gave his only Son for us (CCC 214-221).',
          'Faith in one God means thanksgiving, reverence for the dignity of every person, right use of creation, and trust in every circumstance (CCC 222-227).'
        ],
        memory: { label: 'Memory Verse', text: '"Hear, O Israel: The LORD our God is one LORD; and you shall love the LORD your God with all your heart, and with all your soul, and with all your might." (Deuteronomy 6:4-5)' },
        quiz: [
          {
            question: 'How many Gods are there?',
            options: ['Many gods, one for each country', 'One God, living and true', 'Two gods, a good one and a bad one'],
            answerIndex: 1,
            explanation: "God revealed himself to Israel as the one LORD, and faith in one God is the Creed's first affirmation (CCC 200-202)."
          },
          {
            question: 'What name did God reveal to Moses at the burning bush?',
            options: ["'I AM WHO I AM'", "'The Strongest Warrior'", "'The Faraway One'"],
            answerIndex: 0,
            explanation: "God revealed his mysterious name YHWH, 'I AM WHO I AM,' to Moses, showing that he alone IS and is close to his people (CCC 203-213)."
          },
          {
            question: 'Because God is truth, what can we be sure of?',
            options: ['That his words can never deceive us', 'That he changes his mind about loving us', 'That he only tells the truth sometimes'],
            answerIndex: 0,
            explanation: 'God is truth itself, and his words, expressed with faithfulness from age to age, cannot deceive (CCC 215-217).'
          }
        ],
        reflection: {
          child: 'God said his name means "I AM": he is always with you. When do you most like knowing God is near?',
          youth: 'If God alone is "I AM," the fullness of everything, what "little gods" (things you treat as ultimate) compete for your heart?',
          adult: "Review the five consequences of faith in one God (CCC 222-227): knowing his greatness, thanksgiving, human dignity, right use of things, trust in trials. Which one is weakest in your life today?"
        },
        activity: {
          child: 'Learn to say the Shema: "The Lord our God is one Lord," and pray it before bed tonight.',
          youth: 'Memorize Deuteronomy 6:4-5 and pray it once in the morning and once at night this week.',
          adult: 'Spend five minutes in adoration of God simply for who he is ("I AM"), asking for nothing, only acknowledging his greatness with thanksgiving.'
        }
      },
      {
        id: 'p1u4l2',
        title: 'The Holy Trinity: Central Mystery of Our Faith',
        ccc: '232-267',
        scripture: 'Matthew 28:19',
        objective: 'Understand that the one God is a Trinity of Persons, Father, Son, and Holy Spirit, the central mystery of Christian faith and life, revealed to us by Jesus Christ.',
        teaching: {
          child: "God is one, and God is three Persons: the Father, the Son, and the Holy Spirit. This is called the Holy Trinity. It is a beautiful mystery, too big for our heads but not too big for our hearts. Jesus told us about it: he showed us the Father, and he sent us the Holy Spirit. You were baptized in the name of the Father and of the Son and of the Holy Spirit. Every time you make the Sign of the Cross, you are saying hello to the Trinity who lives in you.",
          youth: "The deepest truth about God is one we could never have guessed: the one God is a communion of three Persons, Father, Son, and Holy Spirit. The Trinity is the central mystery of Christian faith and life, the source of all the other mysteries. It is a mystery in the strict sense: reason alone could never discover it, and even after revelation we cannot fully comprehend it; we know it only because Jesus revealed the Father, showed himself to be the eternal Son, and sent the Holy Spirit. The three Persons are not three gods, and not three costumes God wears: each Person is fully God, one in being with the others, yet really distinct as Father, Son, and Spirit in their relations to one another. The Father sends the Son to save us, and the Father and the Son send the Spirit to make us holy: that is the Trinity at work in your life. You were plunged into this mystery at Baptism, and the whole Christian life is friendship with the three divine Persons.",
          adult: "The mystery of the Most Holy Trinity is the central mystery of Christian faith and life: the mystery of God in himself, the source of all the other mysteries of faith and the light that enlightens them (CCC 234). Christians are baptized in the name (singular, for God is one) of the Father and of the Son and of the Holy Spirit (CCC 232-233). The Trinity is a mystery in the strict sense, one of the mysteries hidden in God which could never be known unless revealed from above; even after revelation it remains inexhaustible to created intellect (CCC 237). It was revealed by Jesus himself: he made known the Father, revealed himself as the eternal, only-begotten Son, and, with the Father, sent the Holy Spirit, the third divine Person (CCC 238-248). The Church's dogmatic language, refined at Nicaea and Constantinople, confesses one God in three Persons: the Persons are consubstantial, each wholly God, really distinct from one another not in nature but in their relations of origin: the Father begets, the Son is begotten, the Holy Spirit proceeds (CCC 249-256). The divine works are inseparable, common to the three Persons, yet each Person performs the common work according to his personal property; hence we speak of the missions of the Son and the Spirit, sent in the fullness of time to bring us into the very life of the Trinity (CCC 257-260, 267). The final end of the whole divine economy is the entry of creatures into the perfect unity of the Blessed Trinity (CCC 260)."
        },
        keyPoints: [
          'The Trinity is the central mystery of Christian faith and life, the source and light of all the other mysteries (CCC 234).',
          'It is a mystery in the strict sense: it could not be known unless God revealed it, and it was revealed by Jesus Christ (CCC 237, 240-244).',
          'There is one God in three Persons: Father, Son, and Holy Spirit, each fully God, really distinct in their relations of origin (CCC 253-255).',
          'The Father sent the Son, and the Father and the Son sent the Spirit, to bring us into the life of the Trinity (CCC 257-260).'
        ],
        memory: { label: 'Prayer to Learn', text: 'Glory be to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and ever shall be, world without end. Amen.' },
        quiz: [
          {
            question: 'Who are the three Persons of the Holy Trinity?',
            options: ['Jesus, Mary, and Joseph', 'The Father, the Son, and the Holy Spirit', 'Peter, James, and John'],
            answerIndex: 1,
            explanation: 'The one God is Father, Son, and Holy Spirit, three Persons in one divine nature (CCC 233, 253).'
          },
          {
            question: 'Could we have figured out the mystery of the Trinity all by ourselves?',
            options: ['Yes, just by studying nature', 'Yes, by counting to three', 'No, God had to reveal it, and Jesus made it known'],
            answerIndex: 2,
            explanation: 'The Trinity is a mystery in the strict sense, inaccessible to reason alone and revealed by Jesus Christ (CCC 237).'
          },
          {
            question: 'How many Gods do Christians believe in when they name the Father, the Son, and the Holy Spirit?',
            options: ['One God in three Persons', 'Three separate gods', 'One Person wearing three masks'],
            answerIndex: 0,
            explanation: 'We do not confess three Gods, but one God in three Persons, consubstantial and really distinct (CCC 253-254).'
          }
        ],
        reflection: {
          child: 'When you make the Sign of the Cross, you name the Father, the Son, and the Holy Spirit. Can you make it slowly and lovingly today?',
          youth: 'The Trinity means God is an eternal communion of love; what does that tell you about why friendship and family matter so much to you?',
          adult: 'The end of the whole divine plan is our entry into the unity of the Trinity (CCC 260); do you pray to the Father, through the Son, in the Spirit, or has your prayer flattened into vagueness?'
        },
        activity: {
          child: 'Practice making the Sign of the Cross slowly and carefully three times today, thinking of each Person as you name him.',
          youth: 'Pray the Glory Be five times today, once after each thing that goes well, to praise the Trinity.',
          adult: 'Begin and end today with a deliberate Sign of the Cross and a slow Glory Be, consciously addressing each divine Person.'
        }
      },
      {
        id: 'p1u4l3',
        title: 'The Almighty Father and His Providence',
        ccc: '268-324',
        scripture: 'Matthew 6:25-34',
        objective: "Understand that God's almighty power is loving and provident, guiding all creation to its good, and that God permits evil only because he can draw good from it, as the Cross of Christ supremely shows.",
        teaching: {
          child: "God our Father is almighty: he can do everything, and nothing is too hard for him. But his favorite way to show his power is by loving and forgiving. God takes care of everything he made: he feeds the birds and dresses the flowers, and you matter to him much more than they do. Sometimes sad and bad things happen, and we do not understand why. But God never stops loving us, and he can bring good even out of the saddest things, just like he brought Easter joy out of Good Friday. You can trust your Father in heaven for everything.",
          youth: "Of all God's attributes, the Creed names only one: almighty. God's power is universal (he made everything and rules everything), loving (he is our Father), and mysterious (it shows itself most in what looks like weakness: the Cross). God is not a distant watchmaker; his providence means he carries creation forward toward its perfection, caring for everything from the greatest things to the smallest sparrow, and he dignifies us by letting us cooperate in his plan through our work, prayers, and choices. But then comes the hardest question in the world: if God is almighty and good, why is there evil? The Christian answer is not a slogan but the whole of the faith: God did not make evil; he permits it, respecting the freedom of his creatures, only because he is powerful enough to draw good from it. The proof is the greatest crime in history, the murder of the Son of God, from which God drew the greatest good: our redemption. So when Jesus says 'Do not be anxious,' he is not saying life will be easy; he is saying your Father can be trusted with all of it.",
          adult: "The Creed professes God's omnipotence: his power is universal, for he who created all things rules all things and can do all things; it is loving, for God is our Father; and it is mysterious, for only faith can discern it when it 'is made perfect in weakness' (CCC 268). Far from being an arbitrary force, God's almighty power is displayed above all in his mercy and forgiveness, for it takes divine power to convert a sinner (CCC 270-277). Creation was not left to itself: God upholds and sustains it at every moment, and by his providence guides it with wisdom and love toward the perfection it does not yet possess (CCC 301-302). Providence is concrete and immediate, extending from the greatest matters to the least, and it works also through the cooperation of creatures: God grants us the dignity of being causes, cooperating in his plan by our actions, prayers, and even our sufferings (CCC 303-308). Why then does evil exist? To this question, as pressing as it is painful, no quick answer suffices; only Christian faith as a whole constitutes the answer (CCC 309). God is in no way, directly or indirectly, the cause of moral evil; he permits it because he respects the freedom of his creatures and, mysteriously, knows how to derive good from it (CCC 311). The supreme demonstration is that from the greatest moral evil ever committed, the rejection and murder of God's own Son, God brought the greatest of goods, the glorification of Christ and our redemption (CCC 312-314). We firmly believe that God is master of the world and history, though the ways of providence are often unknown to us until we see God face to face (CCC 314)."
        },
        keyPoints: [
          "God's power is universal, loving, and mysterious, and he shows his almighty power especially by mercy and forgiveness (CCC 268-270, 277).",
          'Divine providence means God lovingly guides all creation toward its perfection, caring even for the smallest things (CCC 302-305).',
          'God gives creatures the dignity of cooperating in his plan through their actions, prayers, and sufferings (CCC 306-308).',
          'God is never the cause of moral evil; he permits it only because, as the Cross proves, he can draw good from it (CCC 311-312, 324).'
        ],
        memory: { label: 'Memory Verse', text: '"Seek first his kingdom and his righteousness, and all these things shall be yours as well. Therefore do not be anxious about tomorrow." (Matthew 6:33-34)' },
        quiz: [
          {
            question: 'How does God most like to show his almighty power?',
            options: ['By scaring people with storms', 'By showing mercy and forgiving sins', 'By keeping his distance from us'],
            answerIndex: 1,
            explanation: 'God shows his almighty power above all in his mercy and forgiveness of sins (CCC 270, 277).'
          },
          {
            question: "What does God's providence mean?",
            options: ['God made the world and then forgot about it', 'God only cares about very important people', 'God lovingly guides and cares for everything he made, even the smallest things'],
            answerIndex: 2,
            explanation: 'By his providence God upholds creation and guides it toward its perfection, caring for all things from the greatest to the least (CCC 302-303).'
          },
          {
            question: 'Why does God permit evil to happen?',
            options: ['Because he respects our freedom and can mysteriously draw good from evil, as he did at the Cross', 'Because he causes evil himself', 'Because he is not strong enough to stop it'],
            answerIndex: 0,
            explanation: 'God is in no way the cause of moral evil; he permits it because he knows how to derive good from it, supremely shown in Christ\'s death and resurrection (CCC 311-312).'
          }
        ],
        reflection: {
          child: 'God takes care of the birds and the flowers, and he takes care of you. What worry can you give to God today?',
          youth: 'Think of something hard in your life right now; can you ask God not only to remove it but to bring good out of it?',
          adult: 'Where has God, in your own history, drawn good from something evil or painful, and what present anxiety is he asking you to surrender to his providence?'
        },
        activity: {
          child: 'Whisper your biggest worry to God tonight, then say: "Father, I trust in you."',
          youth: 'Read Matthew 6:25-34, then write your top three worries and hand each one to God in a short prayer.',
          adult: 'Spend five minutes reviewing the day with God, naming one suffering or setback, and explicitly entrusting it to his providence with the words "Jesus, I trust in you."'
        }
      },
      {
        id: 'p1u4l4',
        title: 'Creation: Heaven and Earth, Visible and Invisible',
        ccc: '325-354',
        scripture: 'Genesis 1:1; Psalm 91:11',
        objective: 'Understand that God created everything visible and invisible from nothing, that the angels are his servants and messengers who watch over us, and that all creation is good and ordered to his glory.',
        teaching: {
          child: "In the beginning, God made everything: the sky, the sea, the animals, the stars, and you! He made it all out of nothing, just by his word, and when he looked at it, he saw that it was good. God also made the angels: they are his invisible helpers and messengers who see his face and do what he asks. God has given you your very own guardian angel to watch over you every day. All around you, the world is like a big song praising God who made it.",
          youth: "The Creed says God made 'heaven and earth,' meaning everything that exists: the visible world of matter and the invisible world of spirits. God created freely, from nothing, not from any pre-existing stuff and not because he had to; creation is the first witness of his love. The invisible creatures are the angels: purely spiritual beings, with intelligence and will, personal and immortal, who serve God as messengers (the word 'angel' names their job) and surround the whole life of Christ from Bethlehem to the Resurrection. The Church teaches that from infancy to death, human life is surrounded by the angels' watchful care; your guardian angel is not a cartoon but a real protector and shepherd leading you toward life. The visible world, too, is God's work: created in a state of journeying toward perfection, with each creature possessing its own goodness, ordered and interdependent, and man at the summit. Nothing that exists is an accident; everything is a gift.",
          adult: "The Creed professes God as 'Creator of heaven and earth, of all things visible and invisible': the scriptural expression 'heaven and earth' means all that exists, and points to the bond and distinction between the world of spirits and the world of bodies (CCC 325-327). God created the universe freely, out of wisdom and love, and 'from nothing' (ex nihilo): he needed no pre-existent matter and no help, and creation is neither a necessity nor a product of chance (CCC 295-296, 317). The existence of angels, spiritual, non-corporeal beings, is a truth of faith: as purely spiritual creatures they have intelligence and will, are personal and immortal, and surpass in perfection all visible creatures (CCC 328-330). Christ is the center of the angelic world: they are his angels, and they have served the plan of salvation from creation onward, appearing throughout the life of Christ and the Church (CCC 331-336). From infancy to death, human life is surrounded by their watchful care and intercession; beside each believer stands an angel as protector and shepherd (CCC 336). The visible world was created good, indeed 'very good': each creature possesses its own goodness and perfection, reflecting in its own way a ray of God's infinite wisdom; creatures exist in interdependence and hierarchy, with man at the summit, and the universe was created 'in a state of journeying' toward an ultimate perfection yet to be attained (CCC 337-349, 302). The beauty and order of creation call forth wonder and worship of the Creator (CCC 341, 353-354)."
        },
        keyPoints: [
          'God freely created everything, visible and invisible, from nothing, out of wisdom and love (CCC 296, 317, 325).',
          "Angels are purely spiritual creatures with intelligence and will, servants and messengers of God, and Christ is the center of their world (CCC 329-331).",
          'From its beginning to death, each human life is surrounded by the watchful care and intercession of the angels (CCC 336).',
          "Creation is good and ordered: each creature reflects a ray of God's wisdom, and the world journeys toward the perfection God intends (CCC 339-341, 302)."
        ],
        memory: { label: 'Memory Verse', text: '"For he will give his angels charge of you to guard you in all your ways." (Psalm 91:11)' },
        quiz: [
          {
            question: 'What did God use to create the world?',
            options: ['Nothing: he created everything from nothing by his word', 'Old material left over from another world', 'He asked the angels to build it for him'],
            answerIndex: 0,
            explanation: 'God created the world freely and from nothing, needing no pre-existent matter and no help (CCC 296-297, 317).'
          },
          {
            question: 'What are angels?',
            options: ['People who died and got wings', 'Purely spiritual creatures, servants and messengers of God', 'Imaginary characters from stories'],
            answerIndex: 1,
            explanation: 'Angels are spiritual, personal, and immortal creatures with intelligence and will, who serve God and announce his plan (CCC 329-330).'
          },
          {
            question: 'What did God see when he looked at everything he had made?',
            options: ['That it needed to be thrown away', 'That it was boring', 'That it was very good'],
            answerIndex: 2,
            explanation: 'Each creature possesses its own goodness, and God saw that everything he had made was very good (CCC 339, 299).'
          }
        ],
        reflection: {
          child: 'God gave you a guardian angel who is with you right now. What would you like your angel to help you with today?',
          youth: 'If every creature reflects a ray of God\'s wisdom, what part of creation most makes you want to praise him, and do you ever actually do it?',
          adult: 'Do you treat the created world, and your own place in it, as gift and sign of the Creator, or as raw material; where is God inviting more wonder and stewardship?'
        },
        activity: {
          child: 'Learn the Guardian Angel prayer: "Angel of God, my guardian dear, to whom God\'s love commits me here: ever this day be at my side, to light and guard, to rule and guide. Amen."',
          youth: 'Read the creation account in Genesis 1 and write down one thing that surprises you about how God creates.',
          adult: 'Take a ten-minute walk outside without your phone, deliberately noticing five created things and praising God for each; end by greeting your guardian angel.'
        }
      },
      {
        id: 'p1u4l5',
        title: "Man and Woman: Made in God's Image",
        ccc: '355-384',
        scripture: 'Genesis 1:26-27',
        objective: "Understand that every human being, man and woman, is created in God's image, a unity of body and soul, equal in dignity, and made for communion with God.",
        teaching: {
          child: "Of everything God made, you are the most special. God made people in his own image: that means you can know God, love God, and love other people. You are made of a body he shaped and a soul that will live forever, and both are gifts from God. God made people as boys and girls, and both are equally precious to him. Adam and Eve, the first people, were God's friends and were very happy with him. You were made to be God's friend too, forever.",
          youth: "What makes a human being different from a star, a tree, or a dolphin? The Catechism answers: of all visible creatures, only man is able to know and love his Creator; only man is called to share, by knowledge and love, in God's own life. Every person is created in the image of God: not a something but a someone, capable of self-knowledge, of freely giving himself, and of communion with God and others. You are a unity of body and soul: your body is not a shell or a machine but truly part of you, and your soul, spiritual and immortal, is created directly by God (it is not produced by your parents). God created humanity male and female: perfectly equal in dignity as persons, willingly different and complementary, made for each other and together entrusted with the world. Our first parents were created in original holiness and justice, in friendship with God, and that friendship, not money, fame, or pleasure, is what every human heart was built for.",
          adult: "Man occupies a unique place in creation: he is created in the image of God, the only visible creature able to know and love his Creator, and the only creature on earth that God has willed for its own sake (CCC 355-358). Being in God's image means the human individual is a person: not something but someone, capable of self-knowledge, self-possession, free self-giving, and communion with other persons, and called by grace to a covenant with his Creator (CCC 357). The human person, made in God's image, is a being at once corporeal and spiritual: the unity of soul and body is so profound that the soul is the 'form' of the body; the body is not a prison but shares in the dignity of the image of God (CCC 362-365). Each spiritual soul is created immediately by God, not produced by the parents, and it is immortal: it does not perish at death and will be reunited with the body at the final Resurrection (CCC 366). God created man and woman together: perfectly equal as human persons in dignity, and complementary as masculine and feminine, willed by God for each other and for a communion of persons; in marriage they are united so as to transmit human life and cooperate in God's work as stewards of creation (CCC 369-373). Our first parents were constituted in an original state of holiness and justice: friendship with God, interior harmony, harmony between man and woman and with all creation, a grace destined to be lost by sin, as the next lesson recounts (CCC 374-379, 384)."
        },
        keyPoints: [
          "Every human being is created in the image of God: a person capable of knowing and loving the Creator, willed for his or her own sake (CCC 356-358).",
          'The human person is a unity of body and soul; the spiritual soul is created immediately by God and is immortal (CCC 362-366).',
          'Man and woman are created equal in dignity as persons, and complementary, made by God for each other and for communion (CCC 369-372).',
          'Our first parents were created in original holiness and justice, in friendship with God (CCC 374-375, 384).'
        ],
        memory: { label: 'Memory Verse', text: '"So God created man in his own image, in the image of God he created him; male and female he created them." (Genesis 1:27)' },
        quiz: [
          {
            question: 'What does it mean that you are made in the image of God?',
            options: ['That God has a body just like ours', 'That you can know God, love him, and freely give yourself to others', 'That you can do anything you want with no consequences'],
            answerIndex: 1,
            explanation: 'Being in God\'s image means being a person capable of self-knowledge, self-giving, and communion with God and others (CCC 357).'
          },
          {
            question: 'Where does your soul come from?',
            options: ['It is created directly by God and will never die', 'It is made by your parents like your hair color', 'It slowly grows out of the body'],
            answerIndex: 0,
            explanation: 'Every spiritual soul is created immediately by God and is immortal (CCC 366).'
          },
          {
            question: 'Are men and women equal in dignity before God?',
            options: ['No, one is worth more than the other', 'Only in some countries', 'Yes, perfectly equal as persons, and made for each other'],
            answerIndex: 2,
            explanation: 'Man and woman have been created in perfect equality as human persons, willed by God in complementarity (CCC 369-372).'
          }
        ],
        reflection: {
          child: 'God made you in his own image and he is happy he made you. What do you want to say to God about how he made you?',
          youth: 'If every person you meet is an image of God, how would that change the way you treat the person you find hardest to like?',
          adult: 'Do you honor the unity of body and soul in how you live: your care of your body, your custody of your interior life, and your reverence for the dignity of others, especially the inconvenient ones?'
        },
        activity: {
          child: 'Look in a mirror and say: "God made me in his image, and God loves me." Then say it about someone in your family.',
          youth: 'Today, treat one person you usually ignore as an image of God: greet them, thank them, or help them.',
          adult: 'Perform one hidden act of reverence today for the dignity of a person the world overlooks, and pray for that person by name tonight.'
        }
      },
      {
        id: 'p1u4l6',
        title: 'The Fall and the Promise of a Savior',
        ccc: '385-421',
        scripture: 'Genesis 3:8-15',
        objective: "Understand what original sin is and is not, its consequences for the human family, and God's immediate promise of a Redeemer whose grace is greater than all sin.",
        teaching: {
          child: "God made Adam and Eve happy and holy, but a fallen angel, the devil, told them lies about God. They listened to him and disobeyed God, and that first sin is called original sin. It broke their friendship with God, and sadness, sickness, and death came into the world. But listen to the wonderful part: God did not stop loving them, not even for a second. Right away he promised to send a Savior who would crush the serpent. That Savior is Jesus, and his love is stronger than every sin. God can always make things right again.",
          youth: "Why is the world so obviously broken? The Church's answer begins with a real event at the beginning of history: our first parents, tempted by the devil (a fallen angel who chose irrevocably to reject God), abused their freedom, preferring themselves to God and distrusting his goodness. That first sin, called original sin, cost them the original holiness they had received, and its effects spread to the whole human race: we are all born deprived of that original holiness, with a wounded nature inclined to sin (an inclination called concupiscence). Be precise about what original sin is not: it is not a sin you personally committed; it is 'contracted,' not 'committed,' a state we are born into, not an act we chose, and human nature is wounded, not totally corrupted. Look honestly at the world and at your own heart, and the doctrine explains what you see: the pull toward selfishness that nobody taught you. But Genesis 3:15 already contains the Gospel in miniature, the Protoevangelium: the offspring of the woman will crush the serpent's head. The Church even dares to sing at Easter, 'O happy fault, that earned so great, so glorious a Redeemer!' Where sin increased, grace abounded all the more.",
          adult: "The doctrine of the fall makes sense of the evil we experience, and it can only be understood in the light of Christ, whose grace reveals sin for what it is (CCC 385-389). Behind humanity's disobedient choice lurks a seductive voice: Scripture and Tradition see in the serpent a fallen angel, Satan, whose sin, and that of the other fallen angels, was a free, radical, and irrevocable rejection of God and his reign; it is the irrevocable character of their choice, not a defect in divine mercy, that makes their sin unforgivable (CCC 391-393). The account of the fall in Genesis 3 uses figurative language but affirms a primeval event, a deed that took place at the beginning of the history of man (CCC 390). Tempted by the devil, man abused his freedom: he let trust in his Creator die in his heart and, preferring himself to God, disobeyed him; in that sin man lost the original holiness and justice he had received, not only for himself but for all human beings (CCC 397-399, 416). The consequences are far-reaching: harmony with God, within the person, between man and woman, and with creation was shattered, and death entered human history (CCC 399-400). Original sin is transmitted to all Adam's descendants by propagation, not imitation: it is a sin 'contracted,' not 'committed,' a state and not an act, a deprivation of original holiness and justice; human nature is wounded, subject to ignorance, suffering, death, and the inclination to sin called concupiscence, but it is not totally corrupted (CCC 404-405, 418-419). Yet God did not abandon man: in the very sentence on the serpent, Genesis 3:15, the Church reads the Protoevangelium, the first announcement of the Messiah, the New Adam, whose victory would come through the woman, the New Eve (CCC 410-411). Hence the Easter Exsultet's audacious cry, 'O happy fault, that earned so great, so glorious a Redeemer,' for where sin increased, grace abounded all the more (CCC 412, 420)."
        },
        keyPoints: [
          "Tempted by the devil, a fallen angel, our first parents abused their freedom and, preferring themselves to God, disobeyed him (CCC 391-392, 397-398).",
          "Original sin is 'contracted,' not 'committed': a state of deprivation of original holiness passed to all, not a personal act of ours (CCC 404).",
          'Human nature is wounded by original sin, inclined to sin (concupiscence), and subject to suffering and death, but not totally corrupted (CCC 405, 418).',
          "In Genesis 3:15, the Protoevangelium, God immediately promised a Redeemer, and Christ's grace is greater than all sin (CCC 410-412, 420)."
        ],
        memory: { label: 'Memory Verse', text: '"I will put enmity between you and the woman, and between your seed and her seed; he shall bruise your head, and you shall bruise his heel." (Genesis 3:15)' },
        quiz: [
          {
            question: 'Who tempted Adam and Eve to disobey God?',
            options: ['The devil, a fallen angel who had rejected God', 'A talking pet with no bad intentions', 'Another human being'],
            answerIndex: 0,
            explanation: 'Behind the serpent Scripture sees Satan, a fallen angel whose free and irrevocable choice was to reject God (CCC 391-392).'
          },
          {
            question: 'What is original sin for us, the children of Adam?',
            options: ['A bad deed each baby personally commits', "A state we are born in: 'contracted,' not 'committed,' the loss of original holiness", 'Just a story with no meaning'],
            answerIndex: 1,
            explanation: "Original sin is a sin 'contracted' and not 'committed,' a state of deprivation of original holiness, not a personal fault in us (CCC 404-405)."
          },
          {
            question: 'What did God do right after the first sin?',
            options: ['He gave up on the human race forever', 'He waited thousands of years before caring again', 'He promised a Savior who would defeat the serpent'],
            answerIndex: 2,
            explanation: 'In Genesis 3:15, the Protoevangelium, God announced the coming Messiah and the victory over evil (CCC 410-411).'
          }
        ],
        reflection: {
          child: 'Even when Adam and Eve disobeyed, God still loved them and promised to help. What do you want to tell God when you have done something wrong?',
          youth: 'Where do you notice the "pull" of concupiscence in your own life, and what would it look like to bring that exact spot to Christ instead of hiding it like Adam?',
          adult: 'The Exsultet dares to call Adam\'s sin a "happy fault"; can you name a fault or wound in your own history through which Christ\'s grace has abounded, and one you have not yet surrendered to him?'
        },
        activity: {
          child: 'Before bed, tell God you are sorry for one thing you did wrong today, then thank him for sending Jesus, and let him hug your heart.',
          youth: 'Make a brief examination of conscience tonight, and plan when you will next go to the sacrament of Reconciliation.',
          adult: 'Make a ten-minute examen: recall where you "hid from God" today, confess it honestly, and end by reading Romans 5:18-21 as God\'s answer.'
        }
      }
    ]
  }
];
