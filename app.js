
document.getElementById('deliveryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const deliveries = parseInt(document.getElementById('deliveries').value, 10);
    const baseReward = parseInt(document.getElementById('baseReward').value, 10);  // 配達報酬
    const promotion = parseInt(document.getElementById('promotion').value, 10);     // プロモーション
    const tip = parseInt(document.getElementById('tip').value, 10);                 // チップ

    // 配達報酬、プロモーション、チップの合計を計算
    const totalSales = baseReward + promotion + tip;

    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    // 終了時間が開始時間より小さい場合（翌日跨ぎ）
    let workHours = (endHours + endMinutes / 60) - (startHours + startMinutes / 60);
    if (workHours < 0) {
        workHours += 24; // 24時間を加算
    }

    const baseRewardPerHour = baseReward / workHours;
    const totalSalesPerHour = totalSales / workHours;
    const salesPerDelivery = totalSales / deliveries;

document.getElementById('results').innerHTML = `
    <p>稼働時間: <span class="result-value">${workHours.toFixed(2)}</span> 時間</p>
    <p>配達報酬のみ 時間あたり: <span class="result-value">${baseRewardPerHour.toFixed(2)}</span> 円</p>
    <p>合計売上 時間あたり: <span class="result-value">${totalSalesPerHour.toFixed(2)}</span> 円</p>
    <p>1件あたり売上: <span class="result-value">${salesPerDelivery.toFixed(2)}</span> 円</p>
    <hr>
    <h3>詳細</h3>
    <p>配達報酬: <span class="result-value">${baseReward}</span> 円</p>
    <p>プロモーション: <span class="result-value">${promotion}</span> 円</p>
    <p>チップ: <span class="result-value">${tip}</span> 円</p>
    <p>合計売上: <span class="result-value">${totalSales}</span> 円</p>
`;

});
    