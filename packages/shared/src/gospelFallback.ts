/**
 * Fallback Gospel passages used when the live lectionary service is unreachable.
 * One is chosen by day of year so the passage still changes daily.
 */
export interface GospelPassage {
  reference: string;
  title: string;
  text: string;
}

export const FALLBACK_GOSPELS: GospelPassage[] = [
  {
    reference: 'Matthew 5:14-16',
    title: 'The Light of the World',
    text: '"You are the light of the world. A city set on a hill cannot be hid. Nor do men light a lamp and put it under a bushel, but on a stand, and it gives light to all in the house. Let your light so shine before men, that they may see your good works and give glory to your Father who is in heaven."',
  },
  {
    reference: 'Matthew 11:28-30',
    title: 'Come to Me',
    text: '"Come to me, all who labor and are heavy laden, and I will give you rest. Take my yoke upon you, and learn from me; for I am gentle and lowly in heart, and you will find rest for your souls. For my yoke is easy, and my burden is light."',
  },
  {
    reference: 'Mark 4:35-41',
    title: 'Jesus Calms the Storm',
    text: 'A great storm of wind arose, and the waves beat into the boat, so that the boat was already filling. But Jesus was in the stern, asleep on the cushion; and they woke him and said to him, "Teacher, do you not care if we perish?" And he awoke and rebuked the wind, and said to the sea, "Peace! Be still!" And the wind ceased, and there was a great calm. He said to them, "Why are you afraid? Have you no faith?"',
  },
  {
    reference: 'Mark 10:13-16',
    title: 'Let the Children Come',
    text: 'They were bringing children to him, that he might touch them; and the disciples rebuked them. But when Jesus saw it he was indignant, and said to them, "Let the children come to me, do not hinder them; for to such belongs the kingdom of God. Truly, I say to you, whoever does not receive the kingdom of God like a child shall not enter it." And he took them in his arms and blessed them, laying his hands upon them.',
  },
  {
    reference: 'Luke 10:25-37',
    title: 'The Good Samaritan',
    text: 'A lawyer asked Jesus, "And who is my neighbor?" Jesus told of a man beaten by robbers and left half dead. A priest passed by, and a Levite too. But a Samaritan, as he journeyed, came to where he was; and when he saw him, he had compassion, and went to him and bound up his wounds, and took care of him. "Which of these three, do you think, proved neighbor?" He said, "The one who showed mercy on him." And Jesus said to him, "Go and do likewise."',
  },
  {
    reference: 'Luke 15:3-7',
    title: 'The Lost Sheep',
    text: '"What man of you, having a hundred sheep, if he has lost one of them, does not leave the ninety-nine in the wilderness, and go after the one which is lost, until he finds it? And when he has found it, he lays it on his shoulders, rejoicing. Just so, I tell you, there will be more joy in heaven over one sinner who repents than over ninety-nine righteous persons who need no repentance."',
  },
  {
    reference: 'Luke 24:13-35',
    title: 'The Road to Emmaus',
    text: 'That very day two of them were going to a village named Emmaus, and Jesus himself drew near and went with them. Beginning with Moses and all the prophets, he interpreted to them in all the scriptures the things concerning himself. When he was at table with them, he took the bread and blessed, and broke it, and gave it to them. And their eyes were opened and they recognized him. They said to each other, "Did not our hearts burn within us while he talked to us on the road?"',
  },
  {
    reference: 'John 6:35',
    title: 'The Bread of Life',
    text: 'Jesus said to them, "I am the bread of life; he who comes to me shall not hunger, and he who believes in me shall never thirst."',
  },
  {
    reference: 'John 10:14-15',
    title: 'The Good Shepherd',
    text: '"I am the good shepherd; I know my own and my own know me, as the Father knows me and I know the Father; and I lay down my life for the sheep."',
  },
  {
    reference: 'John 13:34-35',
    title: 'A New Commandment',
    text: '"A new commandment I give to you, that you love one another; even as I have loved you, that you also love one another. By this all men will know that you are my disciples, if you have love for one another."',
  },
  {
    reference: 'John 14:1-6',
    title: 'The Way, the Truth, and the Life',
    text: '"Let not your hearts be troubled; believe in God, believe also in me. In my Father\'s house are many rooms; I go to prepare a place for you. And when I go and prepare a place for you, I will come again and will take you to myself, that where I am you may be also." Thomas said to him, "Lord, we do not know where you are going; how can we know the way?" Jesus said to him, "I am the way, and the truth, and the life."',
  },
  {
    reference: 'John 15:4-5',
    title: 'The Vine and the Branches',
    text: '"Abide in me, and I in you. As the branch cannot bear fruit by itself, unless it abides in the vine, neither can you, unless you abide in me. I am the vine, you are the branches. He who abides in me, and I in him, he it is that bears much fruit, for apart from me you can do nothing."',
  },
  {
    reference: 'Matthew 6:9-13',
    title: 'The Lord\'s Prayer',
    text: '"Pray then like this: Our Father who art in heaven, hallowed be thy name. Thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread; and forgive us our debts, as we also have forgiven our debtors; and lead us not into temptation, but deliver us from evil."',
  },
  {
    reference: 'Matthew 28:18-20',
    title: 'Go and Make Disciples',
    text: 'And Jesus came and said to them, "All authority in heaven and on earth has been given to me. Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you; and lo, I am with you always, to the close of the age."',
  },
];

export function fallbackForDate(date: Date): GospelPassage {
  const start = Date.UTC(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 86400000);
  return FALLBACK_GOSPELS[dayOfYear % FALLBACK_GOSPELS.length];
}
