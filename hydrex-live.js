/** Fill [data-live] nodes from the public Hydrex partner revenue API. */
(function () {
  var URL = 'https://hydrex-revenue-tracker.vercel.app/api/revenue';

  function compactUsd(n) {
    if (!isFinite(n)) return '$0';
    var abs = Math.abs(n);
    if (abs >= 1e6) {
      var m = n / 1e6;
      var t = (m >= 10 ? m.toFixed(0) : m.toFixed(1)).replace(/\.0$/, '');
      return '$' + t + 'M';
    }
    if (abs >= 1000) return '$' + Math.round(n / 1000).toLocaleString('en-US') + 'K';
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  function fill(key, text) {
    [].forEach.call(document.querySelectorAll('[data-live="' + key + '"]'), function (el) {
      el.textContent = text;
    });
  }

  fetch(URL)
    .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
    .then(function (d) {
      var h = d.headlines || {};
      var tvl = d.tvl || {};
      fill('peakTvl', compactUsd(tvl.peakTvl));
      fill('currentTvl', compactUsd(tvl.currentTvl));
      fill('fees', compactUsd(h.realizedFees));
      fill('bribes', compactUsd(h.allBribes || h.realizedBribes));
      fill('total', compactUsd(h.total));
      fill('partners', String(d.partnerCount));
      var active = (d.partners || []).filter(function (p) { return (p.currentTvl || 0) > 0; }).length;
      fill('active', String(active));
      if (d.bestMonth) fill('bestMonth', compactUsd(d.bestMonth.revenue));
      var admPeak = (d.partners || [])
        .filter(function (p) { return p.admiralsClub; })
        .reduce(function (s, p) { return s + (p.peakTvl || 0); }, 0);
      if (admPeak > 0) fill('admiralsTvl', compactUsd(admPeak));
    })
    .catch(function () { /* keep the HTML fallbacks */ });
})();
