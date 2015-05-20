var alt = require('../alt-application.js');
var HistoryActions = require('../actions/history-actions.js');
var _ = require('lodash');

class HistoryStore {
  constructor() {
    this.items = {
      "http://www.washingtonpost.com/business/economy/how-to-know-if-your-car-is-part-of-the-biggest-recall-in-history/2015/05/19/f19899fe-fe66-11e4-8b6c-0dcce21e223d_story.html?hpid=z5" : {
        "hostname" : "www.washingtonpost.com",
        "url" : "http://www.washingtonpost.com/business/economy/how-to-know-if-your-car-is-part-of-the-biggest-recall-in-history/2015/05/19/f19899fe-fe66-11e4-8b6c-0dcce21e223d_story.html?hpid=z5",
        "scheme" : "http:",
        "title": "How to know if your car is part of the largest consumer recall in history",
        "icon" : "",
        "image": "https://img.washingtonpost.com/rw/2010-2019/WashingtonPost/2015/05/19/National-Economy/Images/2015-05-08T062358Z_01_TOK300_RTRIDSP_3_TAKATA-RESULTS-1251.jpg",
        "meta" : {
          "keywords" : "business",
          "viewport" : "width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=0.5, maximum-scale=2.0",
          "siteName" : "Washington Post",
          "og:site_name" : "Washington Post",
          "url" : "http://www.washingtonpost.com/business/economy/how-to-know-if-your-car-is-part-of-the-biggest-recall-in-history/2015/05/19/f19899fe-fe66-11e4-8b6c-0dcce21e223d_story.html",
          "twitter:card" : "summary_large_image",
          "og:title" : "How to know if your car is part of the largest consumer recall in history",
          "og:image" : "https://img.washingtonpost.com/rw/2010-2019/WashingtonPost/2015/05/19/National-Economy/Images/2015-05-08T062358Z_01_TOK300_RTRIDSP_3_TAKATA-RESULTS-1251.jpg",
          "title" : "How to know if your car is part of the largest consumer recall in history",
          "og:url" : "http://www.washingtonpost.com/business/economy/how-to-know-if-your-car-is-part-of-the-biggest-recall-in-history/2015/05/19/f19899fe-fe66-11e4-8b6c-0dcce21e223d_story.html",
          "microdata" : {
            "items" : []
          },
          "fb:admins" : "500835072",
          "og:type" : "article",
          "fb:app_id" : "41245586762",
          "eomportal-uuid" : "f19899fe-fe66-11e4-8b6c-0dcce21e223d",
          "og:description" : "The government provides a site to search if your car is affected, but the list is not yet completed.",
          "description" : "The government provides a site to search if your car is affected, but the list is not yet completed.",
          "alternate" : [
            {
              "href" : "android-app://com.washingtonpost.android/wp-android/www.washingtonpost.com/business/economy/how-to-know-if-your-car-is-part-of-the-biggest-recall-in-history/2015/05/19/f19899fe-fe66-11e4-8b6c-0dcce21e223d_story.html",
              "type" : null,
              "title" : null
            }
          ],
          "article:publisher" : "https://www.facebook.com/washingtonpost",
          "medium" : "article",
          "previews" : [
            "https://img.washingtonpost.com/rw/2010-2019/WashingtonPost/2015/05/19/National-Economy/Images/2015-05-08T062358Z_01_TOK300_RTRIDSP_3_TAKATA-RESULTS-1251.jpg"
          ],
          "news_keywords" : "business"
        }
      },
      "http://www.nytimes.com/2015/05/20/business/media/prickly-innovator-counts-down-to-his-exit-from-late-night.html" : {
        "url": "http://www.nytimes.com/2015/05/20/business/media/prickly-innovator-counts-down-to-his-exit-from-late-night.html?hp&action=click&pgtype=Homepage&module=second-column-region&region=top-news&WT.nav=top-news&_r=0",
        "hostname": "www.nytimes.com",
        "scheme": "http:",
        "icon": "http://static01.nyt.com/favicon.ico",
        "image": "http://static01.nyt.com/images/2015/05/20/business/Letterman/Letterman-facebookJumbo-v2.jpg",
        "title": "David Letterman, Prickly Late-Night Innovator, Counts Down to His Exit",
        "meta" : {
          "WT.z.gsg" : "Archive",
          "thumbnail_150" : "http://static01.nyt.com/images/2015/05/20/business/Letterman/Letterman-thumbLarge-v2.jpg",
          "utime" : "20150520091139",
          "thumbnail_150_width" : "150",
          "article:published" : "2015-05-19",
          "robots" : "noarchive",
          "WT.z_rcgs" : "Media and Advertising",
          "hdl" : "David Letterman, Prickly Late-Night Innovator, Counts Down to His Exit",
          "keywords" : "Letterman David,Television,Comedy and Humor,CBS Corporation,Late Show With David Letterman (TV Program),Late Show With David Letterman (TV Program)",
          "ttl" : "Late Show With David Letterman (TV Program)",
          "sourceApp" : "nyt-v5",
          "sectionfront_jsonp" : "http://json8.nytimes.com/services/json/sectionfronts/business/media/index.jsonp",
          "viewport" : "width=device-width, initial-scale=1, maximum-scale=1",
          "per" : "Letterman, David",
          "SCG" : "media",
          "dat" : "May 19, 2015",
          "byl" : "By JOHN KOBLIN",
          "article:modified" : "2015-05-20",
          "alternate" : [
            {
              "type" : null,
              "href" : "http://mobile.nytimes.com/2015/05/20/business/media/prickly-innovator-counts-down-to-his-exit-from-late-night.html",
              "title" : null
            }
          ],
          "cre" : "The New York Times",
          "title" : "David Letterman, Prickly Late-Night Innovator, Counts Down to His Exit",
          "og:url" : "http://www.nytimes.com/2015/05/20/business/media/prickly-innovator-counts-down-to-his-exit-from-late-night.html",
          "slug" : "20letterman",
          "thumbnail" : "http://static01.nyt.com/images/2015/05/20/business/Letterman/Letterman-thumbStandard-v2.jpg",
          "tone" : "news",
          "WT.z_ref" : "nytimes.com",
          "ptime" : "20150519211801",
          "og:image" : "http://static01.nyt.com/images/2015/05/20/business/Letterman/Letterman-facebookJumbo-v2.jpg",
          "hdl_p" : "A Prickly Innovator Counts Down His Exit From Late-Night TV",
          "tom" : "News",
          "des" : "Comedy and Humor",
          "PST" : "News",
          "usageTerms" : "http://www.nytimes.com/content/help/rights/sale/terms-of-sale.html",
          "url" : "http://www.nytimes.com/2015/05/20/business/media/prickly-innovator-counts-down-to-his-exit-from-late-night.html",
          "thumbnail_150_height" : "150",
          "edt" : "NewYork",
          "article:collection" : "http://json8.nytimes.com/services/json/sectionfronts/business/media/index.jsonp",
          "applicationName" : "article",
          "PT" : "article",
          "DISPLAYDATE" : "May 19, 2015",
          "description" : "David Letterman will close out his influential career on late-night television on Wednesday with his 6,028th episode.",
          "article:section" : "Media",
          "thumbnail_width" : "75",
          "author" : "John Koblin",
          "twitter:image" : "http://static01.nyt.com/images/2015/05/20/business/Letterman/Letterman-thumbLarge-v2.jpg",
          "pdate" : "20150519",
          "msapplication-starturl" : "http://www.nytimes.com",
          "articleid" : "100000003693700",
          "medium" : "article",
          "WT.z_rcgn" : "Business",
          "thumbnail_height" : "75",
          "news_keywords" : "David Letterman;TV;Comedy;Late Show With David Letterman",
          "twitter:title" : "David Letterman, Prickly Late-Night Innovator, Counts Down to His Exit",
          "twitter:description" : "David Letterman will close out his influential career on late-night television on Wednesday with his 6,028th episode.",
          "og:title" : "David Letterman, Prickly Late-Night Innovator, Counts Down to His Exit",
          "og:type" : "article",
          "microdata" : {
            "items" : [
              {
                "itemId" : "http://www.nytimes.com/2015/05/20/business/media/prickly-innovator-counts-down-to-his-exit-from-late-night.html",
                "types" : [
                  "http://schema.org/NewsArticle"
                ],
                "properties" : {
                  "genre" : [
                    "News"
                  ],
                  "provider" : [
                    {
                      "itemId" : "http://www.nytimes.com/",
                      "properties" : {
                        "tickerSymbol" : [
                          "NYSE NYT"
                        ],
                        "name" : [
                          " The New York Times Company"
                        ]
                      },
                      "types" : [
                        "http://schema.org/Organization"
                      ]
                    }
                  ],
                  "datePublished" : [
                    "2015-05-19"
                  ],
                  "headline" : [
                    "David Letterman, Prickly Late-Night Innovator, Counts Down to His Exit"
                  ],
                  "creator" : [
                    {
                      "properties" : {
                        "name" : [
                          "JOHN KOBLIN"
                        ]
                      },
                      "types" : [
                        "http://schema.org/Person"
                      ]
                    }
                  ],
                  "description" : [
                    "David Letterman will close out his influential career on late-night television on Wednesday with his 6,028th episode."
                  ],
                  "alternativeHeadline" : [
                    "A Prickly Innovator Counts Down His Exit From Late-Night TV "
                  ],
                  "sourceOrganization" : [
                    {
                      "itemId" : "http://www.nytimes.com/",
                      "types" : [
                        "http://schema.org/Organization"
                      ],
                      "properties" : {
                        "tickerSymbol" : [
                          "NYSE NYT"
                        ],
                        "name" : [
                          " The New York Times Company"
                        ]
                      }
                    }
                  ],
                  "articleBody" : [
                    "In 1988, a rising comic named Jerry Seinfeld went to the Loeb Boathouse in Central Park for a Christmas party for “Late Night With David Letterman.” Mr. Seinfeld had just made a deal to do a sitcom for NBC, and he buttonholed Mr. Letterman in the corner of the restaurant and asked him for advice.",
                    "“He said, ‘Just make sure if you fail, you did what you wanted to do,’ ” Mr. Seinfeld recalled in a recent interview. “I took that to heart. I said, ‘O.K., then that’s what I’m going to do.’ ”",
                    "It was “pivotal and potent” advice, Mr. Seinfeld said, because it came from an entertainer who had transformed the sleepy late-night television format.",
                    "“He was more inventive and more creative with this form than anyone before or since,” Mr. Seinfeld said.",
                    "On Wednesday night on CBS, after 33 years as a host, the longest late-night tenure ever, Mr. Letterman will close out his career with his 6,028th episode. His influence has been substantial: He breathed new life into the talk show, taking it beyond the traditional desk-and-sofa interview sessions with an array of innovative, often outlandish antics; he gave birth to many careers; he became a role model for a generation of comedians, including most of the current late-night roster; and he turned signature segments like Stupid Pet Tricks and his Top 10 list into American cultural institutions.",
                    "He was also front and center for memorable noncomedic moments, whether hosting the first late-night show after the Sept. 11 attacks, turning his 2000 heart surgery into a narrative on his show or castigating John McCain after he canceled an appearance before the 2008 presidential election.",
                    "Mr. Letterman lived out some dark moments on his show as well. In the mid-1990s, after his ratings began to slide, his well-known tendency to self-flagellate turned nearly literal one night when he viciously beat up a David Letterman dummy on stage. In 2009, in one of television’s most uncomfortable moments, he acknowledged that he had had sex with female staff members.",
                    "He could be a brusque interviewer who sometimes made his guests squirm. He was fiercely private, rarely giving interviews, and his disdain for the politics of show business played a role in his failure to land the dream job he had long coveted: succeeding Johnny Carson as the host of “The Tonight Show” in 1992. In an unusually public competition for the job, Mr. Letterman lost out to Jay Leno, and he spent most of the next two decades trailing Mr. Leno in the ratings.",
                    "In recent weeks, however, Mr. Letterman, 68, has been enjoying a victory lap, and he has had to shush the audience at the Ed Sullivan Theater during extended standing ovations featuring chants of “Dave! Dave! Dave!” The run has included a prime-time special and energetic appearances from favorite guests like Mr. Seinfeld, Tina Fey, Julia Roberts, Tom Hanks and Bill Murray.",
                    "For his last show on Wednesday, Mr. Letterman has not announced any guests, and the network has offered little more than to say that it will be full of “surprises.”",
                    "For CBS, Mr. Letterman not only established a presence in that time slot but created a strong platform for his successor, Stephen Colbert, who will take over the show in September. Before Mr. Letterman joined the network in 1993 after 11 years at NBC, CBS had little to no footprint in late night.",
                    "“It’s been substantial, the revenue and the profits over these 20 years,” Leslie Moonves, the chief executive of CBS, said in an interview on Monday. “Previously we were rerunning bad dramas. NBC had been making hundreds of millions of dollars back in the days of Carson. CBS was getting zero. It’s an important part of our makeup.”",
                    "Mr. Moonves, who once had a tense relationship with Mr. Letterman (he was regularly mocked on the show, and Mr. Moonves asked him during one particularly tense meeting, “You got a problem with me?”), said he was not bothered by the consistent losses in the ratings to NBC. (Not counting reruns, Mr. Letterman beat Mr. Leno’s successor, Jimmy Fallon, in the ratings for the first time two weeks ago.)",
                    "“We were still making a profit. It’s not like we were losing money,” Mr. Moonves said. “One of the things about my job is the image of the corporation. That matters on Wall Street. Yes, the bottom line is important, but guess what? The business has changed rapidly, and it was really important to us from an image perspective to have the best guy on at late night.”",
                    "Howard Stern, the provocative radio host, who appeared on Mr. Letterman’s show 43 times, said the second-fiddle ratings status reflected one of the host’s enduring strengths: He refused to compromise.",
                    "“It freed him in some way,” Mr. Stern said. “He probably could have dumbed it down and done a long meaningless monologue that would have made for better ratings, but he stayed true to himself. That takes an unusual strength.”",
                    "Mr. Letterman adjusted the form to make it work for him — not the other way around, Mr. Stern said.",
                    "Though Mr. Letterman started out as a stand-up comic, he wasn’t purely a comedian on his show, Mr. Stern said.",
                    "“He was a broadcaster,” he said. “When you’re on television and drag people through quarter-hours, which is really the job in a nutshell, how do you make someone sit through commercials? How do you make them feel so compelled to sit in front of a TV when they’re dead tired and have to get up to work the next day? A broadcaster knows how to do it. It’s not about the joke. It’s about being compelling, and it’s about being a leader so people want to follow you and want to hear your every word.”",
                    "One of Mr. Letterman’s most popular guests, Julia Roberts, said she had watched his show religiously before she made her first appearance in the late 1980s. Even then, Mr. Letterman had already established one of his lasting legacies: He was a hard-to-please interviewer.",
                    "“I was afraid to go on that show,” she said. “When it came to pass that I was going to come on, I watched with a different point of view, and it seemed all the more real to me when he would just surgically dissect these young actors and leave them quivering.”",
                    "Mr. Letterman’s occasional moodiness with guests reflected the ambivalence he felt toward show business overall. Mr. Moonves said he was “wildly different” from any other performer he had worked with. “He didn’t like the limelight,” he said.",
                    "Even though Mr. Moonves is one of the most powerful executives in the media industry, he said he did not have the slightest clue what Mr. Letterman had planned for his last show. He would not place that phone call. He said he knew that Mr. Letterman wouldn’t tell him.",
                    "Ms. Roberts’s and Mr. Letterman’s rapport over the years — she appeared 26 times — became legendary: They would flirt. They would kiss. They would collapse in laughter. Except for a few appearances here and there, she said, she almost never went on another late-night talk show.",
                    "Like Mr. Stern, she pointed to Mr. Letterman’s originality and his smart brand of humor as distinguishing characteristics of his show.",
                    "“If you can’t keep up with his intellect, you have to keep up with his wit and/or his timing,” she said. “I kept up with his tempo. It’s like, ‘He is going to go this way, and now we’re going to go that way.’ I just try to keep up with him because you never know what he’s going to say or what he’s going to do.”",
                    "Despite the close bond she developed with Mr. Letterman on the air, Ms. Roberts said she had never once seen him away from his studios. Other than an occasional phone call or a brief chat during commercial breaks, the whole of their relationship has played out on television.",
                    "“I’ve never seen him outside of the building,” she said, laughing."
                  ],
                  "copyrightHolder" : [
                    {
                      "properties" : {
                        "name" : [
                          " The New York Times Company"
                        ],
                        "tickerSymbol" : [
                          "NYSE NYT"
                        ]
                      },
                      "types" : [
                        "http://schema.org/Organization"
                      ],
                      "itemId" : "http://www.nytimes.com/"
                    }
                  ],
                  "articleSection" : [
                    "Media",
                    "104D1E63-9701-497B-8CF4-A4D120C9014E"
                  ],
                  "copyrightNotice" : [
                    "http://www.nytimes.com/content/help/rights/copyright/copyright-notice.html"
                  ],
                  "author" : [
                    {
                      "types" : [
                        "http://schema.org/Person"
                      ],
                      "properties" : {
                        "name" : [
                          "JOHN KOBLIN"
                        ]
                      }
                    }
                  ],
                  "printEdition" : [
                    "New York edition"
                  ],
                  "associatedMedia" : [
                    {
                      "properties" : {
                        "url" : [
                          "http://static01.nyt.com/images/2015/05/20/business/Letterman/Letterman-master675.jpg"
                        ],
                        "width" : [
                          "675"
                        ],
                        "copyrightHolder" : [
                          "\n            Credit\n            Damon Winter/The New York Times        "
                        ],
                        "height" : [
                          "414"
                        ],
                        "caption" : [
                          "\n                David Letterman has not revealed plans for his final show on Wednesday night, his 6,028th.\n                        \n            Credit\n            Damon Winter/The New York Times        \n            "
                        ],
                        "description" : [
                          "\n                David Letterman has not revealed plans for his final show on Wednesday night, his 6,028th.\n                        \n            Credit\n            Damon Winter/The New York Times        \n            "
                        ]
                      },
                      "types" : [
                        "http://schema.org/ImageObject"
                      ],
                      "itemId" : "http://static01.nyt.com/images/2015/05/20/business/Letterman/Letterman-master675.jpg"
                    },
                    {
                      "itemId" : "http://static01.nyt.com/images/2015/05/20/business/20LETTERMANJP1/20LETTERMANJP1-articleLarge.jpg",
                      "properties" : {
                        "copyrightHolder" : [
                          "\n            Credit\n            John Paul Filo/CBS        "
                        ],
                        "width" : [
                          "600"
                        ],
                        "url" : [
                          "http://static01.nyt.com/images/2015/05/20/business/20LETTERMANJP1/20LETTERMANJP1-articleLarge.jpg"
                        ],
                        "height" : [
                          "486"
                        ],
                        "caption" : [
                          "\n                Julia Roberts, in a 2009 photo, appeared on Mr. Letterman’s show 26 times. She said: “I just try to keep up with him because you never know what he’s going to say or what he’s going to do.”\n                        \n            Credit\n            John Paul Filo/CBS        \n            "
                        ],
                        "description" : [
                          "\n                Julia Roberts, in a 2009 photo, appeared on Mr. Letterman’s show 26 times. She said: “I just try to keep up with him because you never know what he’s going to say or what he’s going to do.”\n                        \n            Credit\n            John Paul Filo/CBS        \n            "
                        ]
                      },
                      "types" : [
                        "http://schema.org/ImageObject"
                      ]
                    },
                    {
                      "itemId" : "http://static01.nyt.com/images/2015/05/20/arts/20LETTERMANJP2/20LETTERMANJP2-articleLarge.jpg",
                      "types" : [
                        "http://schema.org/ImageObject"
                      ],
                      "properties" : {
                        "caption" : [
                          "\n                Jerry Seinfeld said Mr. Letterman “was more inventive and more creative with this form than anyone before or since.”\n                        \n            Credit\n            Jeffrey R. Staab/CBS        \n            "
                        ],
                        "description" : [
                          "\n                Jerry Seinfeld said Mr. Letterman “was more inventive and more creative with this form than anyone before or since.”\n                        \n            Credit\n            Jeffrey R. Staab/CBS        \n            "
                        ],
                        "url" : [
                          "http://static01.nyt.com/images/2015/05/20/arts/20LETTERMANJP2/20LETTERMANJP2-articleLarge.jpg"
                        ],
                        "width" : [
                          "600"
                        ],
                        "copyrightHolder" : [
                          "\n            Credit\n            Jeffrey R. Staab/CBS        "
                        ],
                        "height" : [
                          "498"
                        ]
                      }
                    },
                    {
                      "itemId" : "http://static01.nyt.com/images/2015/05/20/business/20LETTERMANJP3/20LETTERMANJP3-articleLarge.jpg",
                      "properties" : {
                        "caption" : [
                          "\n                Howard Stern said Mr. Letterman “stayed true to himself.” He adjusted the form to make it work for him, he said.\n                        \n            Credit\n            John P. Filo/CBS        \n            "
                        ],
                        "description" : [
                          "\n                Howard Stern said Mr. Letterman “stayed true to himself.” He adjusted the form to make it work for him, he said.\n                        \n            Credit\n            John P. Filo/CBS        \n            "
                        ],
                        "url" : [
                          "http://static01.nyt.com/images/2015/05/20/business/20LETTERMANJP3/20LETTERMANJP3-articleLarge.jpg"
                        ],
                        "width" : [
                          "600"
                        ],
                        "copyrightHolder" : [
                          "\n            Credit\n            John P. Filo/CBS        "
                        ],
                        "height" : [
                          "456"
                        ]
                      },
                      "types" : [
                        "http://schema.org/ImageObject"
                      ]
                    }
                  ],
                  "usageTerms" : [
                    "http://www.nytimes.com/content/help/rights/sale/terms-of-sale.html",
                    "http://www.nytimes.com/ref/membercenter/help/agree.html"
                  ],
                  "copyrightYear" : [
                    "2015"
                  ],
                  "dateModified" : [
                    "2015-05-20"
                  ],
                  "inLanguage" : [
                    "en-US"
                  ],
                  "identifier" : [
                    "100000003693700"
                  ],
                  "thumbnailUrl" : [
                    "http://static01.nyt.com/images/2015/05/20/business/Letterman/Letterman-thumbStandard-v2.jpg"
                  ]
                }
              }
            ]
          },
          "article:section-taxonomy-id" : "104D1E63-9701-497B-8CF4-A4D120C9014E",
          "lp" : "David Letterman will close out his influential career on late-night television on Wednesday with his 6,028th episode.",
          "WT.z_cad" : "1",
          "og:description" : "David Letterman will close out his influential career on late-night television on Wednesday with his 6,028th episode.",
          "twitter:url" : "http://www.nytimes.com/2015/05/20/business/media/prickly-innovator-counts-down-to-his-exit-from-late-night.html",
          "previews" : [
            "http://static01.nyt.com/images/2015/05/20/business/Letterman/Letterman-facebookJumbo-v2.jpg"
          ],
          "org" : "CBS Corporation",
          "article:tag" : "Late Show With David Letterman (TV Program)",
          "CG" : "business",
          "fb:app_id" : "9869919170"
        }
      }
    };
    this.loading = false;
    this.bindAction(HistoryActions.search, this.onSearch);

    this.bindAction(HistoryActions.reset, this.onReset);
    this.bindAction(HistoryActions.add, this.onAdd);
    this.bindAction(HistoryActions.removed, this.onRemoved);

    this.bindAction(HistoryActions.updateIcon, this.onUpdateIcon);
    this.bindAction(HistoryActions.updateMeta, this.onUpdateMeta);
    this.bindAction(HistoryActions.bookmarked, this.onBookmarked);
    this.bindAction(HistoryActions.notBookmarked, this.onNotBookmarked);
  }
  onSearch() {
    this.loading = true;
  }
  onReset(items) {
    this.loading = false;
    _.merge(this.items, items);
  }
  onAdd(item) {
    this.items[item.url] = item;
  }
  onRemoved(item) {
    delete this.item[item.url];
  }
  onUpdateIcon(icon) {
    this.items[icon.url].icon = icon.iconUrl;
  }
  onUpdateMeta(meta) {
    _.merge(this.items[meta.url], _.omit(meta, 'url'));
  }
  onBookmarked(bookmark) {
    this.items[bookmark.url].bookmarked = true;
  }
  onNotBookmarked(bookmark) {
    this.items[bookmark.url].bookmarked = false;
  }
}

module.exports = alt.createStore(HistoryStore);
