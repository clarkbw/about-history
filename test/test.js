var self = { 
  port : {
    on: function (signal, callback) {
      // console.log(signal, "registered with callback", callback);
      if (signal === "history:reset") {
        callback(
            [
            {"url":"https://www.google.ca/search?q=coffee&ie=utf-8&oe=utf-8&rls=org.mozilla:en-US:official&client=firefox-a&channel=fflb&gfe_rd=ctrl&ei=IaILU7KMIMGV8QexlICYBA&gws_rd=cr","title":"coffee - Google Search","visitCount":1,"time":1393271329865,"host":"www.google.ca","scheme":"https","icon":""},
            {"url":"http://www.google.ca/aclk?sa=L&ai=C0eg4IaILU6mzNK2h6QG98YCYBcGAkfQE-fWEq4wBtvDVBQgAEAEgtlRQ_6my2f3_____AWD9mPuAzAPIAQGpAsVeopASWK4-qgQgT9DPFomdwnsGSYj9tqycYttq_RWKCnl1nFplTPnURvyABZBOgAehz8YqkAcB&sig=AOD64_1mDlkP-hA_KjLPWl3K1nb2UlxTAQ&rct=j&q=coffee&ved=0CCoQ0Qw&adurl=http://tracker.marinsm.com/rd%3Fcid%3D23257uy26872%26mkwid%3DsBTUScHTd_dc%26pcrid%3D37712564289%26pkw%3Dcoffee%26pmt%3De%26lp%3Dhttp%253A%252F%252Fwww.timhortons.com%252Fca%252Fen%252Findex.html&cad=rja","title":null,"visitCount":1,"time":1393271331555,"host":"www.google.ca","scheme":"http","icon":""},
            {"url":"http://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0CDkQFjAA&url=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCoffee&ei=IaILU6mtMMSRrgHVioCgCQ&usg=AFQjCNEkM89AqWgNvzwYhyf8ow9a5293oQ&bvm=bv.61725948,d.aWM&cad=rja","title":null,"visitCount":1,"time":1393271332839,"host":"www.google.ca","scheme":"http","icon":""},
            {"url":"http://en.wikipedia.org/wiki/Coffee","title":"Coffee - Wikipedia, the free encyclopedia","visitCount":1,"time":1393271332911,"host":"en.wikipedia.org","scheme":"http","icon":""},
            {"url":"http://www.timhortons.com/ca/en/index.html","title":"Tim Hortons - Canada","visitCount":1,"time":1393271333755,"host":"www.timhortons.com","scheme":"http","icon":""},
            {"url":"http://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=5&ved=0CE4QFjAE&url=http%3A%2F%2Fitstodiefor.ca%2Fbest-food-in-vancouver%2Fbest-cafes-coffee-in-vancouver%2F&ei=IaILU6mtMMSRrgHVioCgCQ&usg=AFQjCNEs30_g7kQflBHch8ekCBZ5JV7b6A&bvm=bv.61725948,d.aWM&cad=rja","title":null,"visitCount":1,"time":1393271336937,"host":"www.google.ca","scheme":"http","icon":""},
            {"url":"http://itstodiefor.ca/best-food-in-vancouver/best-cafes-coffee-in-vancouver/","title":"Best Cafés (Coffee) in Vancouver | To Die For","visitCount":1,"time":1393271337493,"host":"itstodiefor.ca","scheme":"http","icon":""},
            {"url":"http://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=6&ved=0CFQQFjAF&url=http%3A%2F%2Fwww.huffingtonpost.ca%2F2013%2F03%2F03%2Fbest-coffee-cafes-shops-vancouver_n_2768720.html&ei=IaILU6mtMMSRrgHVioCgCQ&usg=AFQjCNEzPJZS3zNQXiRXgRgVKXiV2Lpphw&bvm=bv.61725948,d.aWM&cad=rja","title":null,"visitCount":1,"time":1393271337598,"host":"www.google.ca","scheme":"http","icon":""},
            {"url":"http://www.huffingtonpost.ca/2013/03/03/best-coffee-cafes-shops-vancouver_n_2768720.html","title":"Best Coffee In Vancouver","visitCount":1,"time":1393271339596,"host":"www.huffingtonpost.ca","scheme":"http","icon":""},
            {"url":"http://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=16&ved=0CLYBEBYwDw&url=http%3A%2F%2Fwww.caffeartigiano.com%2F&ei=IaILU6mtMMSRrgHVioCgCQ&usg=AFQjCNGOClhUt-Rn6wOBIXR3q-w--9TmlA&bvm=bv.61725948,d.aWM&cad=rja","title":null,"visitCount":1,"time":1393271340870,"host":"www.google.ca","scheme":"http","icon":""},
            {"url":"http://www.caffeartigiano.com/","title":"Welcome | Caffè Artigiano","visitCount":1,"time":1393271341290,"host":"www.caffeartigiano.com","scheme":"http","icon":""},
            {"url":"http://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=17&ved=0CLwBEBYwEA&url=http%3A%2F%2Fwww.jjbeancoffee.com%2F&ei=IaILU6mtMMSRrgHVioCgCQ&usg=AFQjCNH5dcdbqT7-o4MRSh67OnrQCSqaTA&bvm=bv.61725948,d.aWM&cad=rja","title":null,"visitCount":1,"time":1393271341814,"host":"www.google.ca","scheme":"http","icon":""},
            {"url":"http://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=18&ved=0CMIBEBYwEQ&url=http%3A%2F%2Fwww.milanocoffee.ca%2F&ei=IaILU6mtMMSRrgHVioCgCQ&usg=AFQjCNHrfGsZvuXYUx33_JCw4OAs9nsJxw&bvm=bv.61725948,d.aWM&cad=rja","title":null,"visitCount":1,"time":1393271342570,"host":"www.google.ca","scheme":"http","icon":""},
            {"url":"http://www.jjbeancoffee.com/","title":"JJ Bean Coffee Roasters & Cafés | Vancouver, BC","visitCount":1,"time":1393271342771,"host":"www.jjbeancoffee.com","scheme":"http","icon":""},
            {"url":"http://www.milanocoffee.ca/","title":"Milano Coffee","visitCount":1,"time":1393271345372,"host":"www.milanocoffee.ca","scheme":"http","icon":""},
            {"url":"http://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=20&ved=0CM8BEBYwEw&url=http%3A%2F%2Fwww.49thparallelroasters.com%2F&ei=IaILU6mtMMSRrgHVioCgCQ&usg=AFQjCNFYYHLb2POwzFug_BfIrK6O1KHRig&bvm=bv.61725948,d.aWM&cad=rja","title":null,"visitCount":1,"time":1393271345511,"host":"www.google.ca","scheme":"http","icon":""},
            {"url":"http://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=19&ved=0CMkBEBYwEg&url=http%3A%2F%2Fwww.instantcoffee.org%2F&ei=IaILU6mtMMSRrgHVioCgCQ&usg=AFQjCNFYIKtD5_jCzCvwcfjmihSxqZfSRA&bvm=bv.61725948,d.aWM&cad=rja","title":null,"visitCount":1,"time":1393271345931,"host":"www.google.ca","scheme":"http","icon":""},
            {"url":"http://www.49thparallelroasters.com/","title":"Forty Ninth Parallel — Welcome","visitCount":1,"time":1393271346062,"host":"www.49thparallelroasters.com","scheme":"http","icon":""},
            {"url":"http://www.instantcoffee.org/","title":"instantcoffee.org : Instant Coffee : no better than you","visitCount":1,"time":1393271346465,"host":"www.instantcoffee.org","scheme":"http","icon":""}]
          );
      }
    },
    emit: function (signal) {
      console.log("signal", _.first(_.rest(arguments)));
    }
  }
};

